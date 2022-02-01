import { ContentPasteSearchOutlined } from "@mui/icons-material"
import axios, { AxiosResponse } from "axios"
import { useState, useEffect } from "react"

export default function useSpotifyPlayer(accessToken: string | undefined) {
  const [lastCachedTrack, setLastCachedTrack] = useState<null | Spotify.Track>(
    null,
  )

  useEffect(() => {
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
            .then((recentlyplayedTracks) => {
              setLastCachedTrack(recentlyplayedTracks.data.items[0].track)
            })
        } else setLastCachedTrack(playingSong.data.item)
      })
  }, [accessToken])

  return {
    lastCachedTrack,
  }
}
