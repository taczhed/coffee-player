import axios from "axios"
import { useState, useEffect } from "react"

export default function useSpotifyPlayer(accessToken: string | undefined) {
  const [player, setPlayer] = useState<null | Spotify.Player>(null)
  const [deviceId, setDeviceId] = useState<null | string>(null)
  const [playerState, setPlayerState] = useState<null | Spotify.PlaybackState>(
    null,
  )
  const [currentTrack, setCurrentTrack] = useState<null | Spotify.Track>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://sdk.scdn.co/spotify-player.js"
    script.async = true
    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Coffee Player",
        getOAuthToken: (cb) => {
          cb(accessToken ? accessToken : "invalid_token")
        },
        volume: 0.5,
      })

      setPlayer(player)

      player.addListener("player_state_changed", (state) => {
        if (!state) return
        setPlayerState(state)
        setCurrentTrack(state.track_window.current_track)
        console.log("state changed!")
      })

      player.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id)
      })

      player.connect()
    }
  }, [accessToken])

  const playSong = (songs: Array<string | undefined>) => {
    if (!deviceId) return
    axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      {
        uris: songs,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
  }

  useEffect(() => {
    // https://api.spotify.com/v1/me/player/currently-playing
    // https://api.spotify.com/v1/me/player/recently-played/?limit=1
    axios
      .get("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((playingSong) => {
        if (playingSong.data === "") {
          axios
            .get(
              "https://api.spotify.com/v1/me/player/recently-played/?limit=1",
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            )
            .then((recentlyplayedSong) =>
              setCurrentTrack(recentlyplayedSong.data.items[0].track),
            )
        } else setCurrentTrack(playingSong.data.item)
      })
  }, [])

  return {
    deviceId,
    player,
    playerState,
    currentTrack,
    playSong,
  }
}
