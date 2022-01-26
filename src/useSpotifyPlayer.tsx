import axios, { AxiosResponse } from "axios"
import { useState, useEffect } from "react"

export default function useSpotifyPlayer(accessToken: string | undefined) {
  const [lastCachedTrack, setLastCachedTrack] = useState<null | Spotify.Track>(
    null,
  )

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me/player/currently-playing", {
        // .get("https://api.spotify.com/v1/recommendations", {
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
              setLastCachedTrack(recentlyplayedSong.data.items[0].track),
            )
        } else setLastCachedTrack(playingSong.data.item)
      })
  }, [accessToken])

  const getUsersTop = (type: string) => {
    return axios
      .get(`https://api.spotify.com/v1/me/top/${type}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((items) => {
        return items
      })
  }

  const getGenres = (items: AxiosResponse<any, any>) => {
    let genres: string[] = []
    let genresQuery = ""
    items.data.items.map((artist: any) => {
      artist.genres.map((genre: any) => {
        if (!genres.includes(genre) && genres.length < 3) {
          genres.push(genre)
          genresQuery += `%2C${genre.replaceAll(" ", "%20")}`
        }
      })
    })
    return genresQuery.slice(3, genresQuery.length)
  }

  const fetchRecommendations = async () => {
    const artists = await getUsersTop("artists")
    let seed_genres = getGenres(artists)

    axios
      .get(
        `https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=${seed_genres}&seed_tracks=0c6xIDDpzE81m2q797ordA`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((recomendations) => {
        console.log(recomendations)
      })
  }

  return {
    lastCachedTrack,
    fetchRecommendations,
  }
}
