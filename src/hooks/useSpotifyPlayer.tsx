import axios from "axios"
import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import SpotifyWebApi from "spotify-web-api-node"
import { handleCurrentTrack } from "../store/currentTrackSlice"
import { useAppDispatch } from "../store/hooks"

export default function useSpotifyPlayer(SpotifyApi: SpotifyWebApi) {
  const dispatch = useAppDispatch()
  const [cookies] = useCookies()
  const [deviceId, setDeviceId] = useState<string>()

  const [trackTimestamp, setTrackTimestamp] = useState<number | null>()
  const [trackProgress, setTrackProgress] = useState<number | null>()

  useEffect(() => {
    SpotifyApi.getMyRecentlyPlayedTracks({
      limit: 1,
    }).then(
      (data) => {
        dispatch(handleCurrentTrack(data.body.items[0].track))
      },
      (err) => console.log(err),
    )
  }, [])

  useEffect(() => {
    // player init
    const script = document.createElement("script")
    script.src = "https://sdk.scdn.co/spotify-player.js"
    script.async = true
    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Coffee Player",
        volume: 1,
        getOAuthToken: (cb) => {
          cb(cookies.accessToken ? cookies.accessToken : "invalid_token")
        },
      })
      player.addListener("ready", ({ device_id }) => setDeviceId(device_id))
      player.connect()
    }
  }, [])

  const playTrack = (uris?: string[]) => {
    SpotifyApi.play({
      device_id: deviceId,
      uris: uris,
      position_ms: trackProgress ? trackProgress : undefined,
    }).then(
      () => fetchCurrentPlayBackState(),
      (err) => console.log(err),
    )
  }

  const togglePause = () => {
    SpotifyApi.pause().then(
      () => {
        console.log("Playback paused")
        fetchCurrentPlayBackState()
      },
      (err) => console.log(err),
    )
  }

  const fetchCurrentPlayBackState = () => {
    SpotifyApi.getMyCurrentPlaybackState().then(
      (data) => {
        setTrackProgress(data.body.progress_ms)
        console.log(data.body)
      },
      (err) => console.log(err),
    )
  }

  return {
    deviceId,
    playTrack,
    togglePause,
    fetchCurrentPlayBackState,
  }
}
