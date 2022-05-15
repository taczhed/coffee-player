import SpotifyWebApi from "spotify-web-api-node"

export default function useSpotifyContent(
  accessToken: string | undefined,
  SpotifyApi: SpotifyWebApi,
) {
  const fetchRecommendations = async (type: string) => {
    let seeds = []

    if (type === "tracks") {
      const tracks = await SpotifyApi.getMyRecentlyPlayedTracks({
        limit: 30,
      }).then((data) => data.body.items)

      for (let i = 0; i < 2; i++) {
        const number = Math.floor(Math.random() * 30)
        seeds[i] = tracks[number].track.artists[0].id
      }
    } else if (type === "artists") {
      const artists = await SpotifyApi.getMyTopArtists({
        limit: 30,
      }).then((data) => data.body.items)
      for (let i = 0; i < 2; i++) {
        const number = Math.floor(Math.random() * 30)
        seeds[i] = artists[number].id
      }
    }

    return await SpotifyApi.getRecommendations({
      seed_artists: seeds,
      limit: 50,
    }).then((data) => data.body.tracks)
  }

  const fetchSavedSongs = async (pageNumber: number) => {
    return await SpotifyApi.getMySavedTracks({
      limit: 30,
      offset: (pageNumber - 1) * 30,
    }).then((data) => data.body)
  }

  const getMe = async () => {
    return await SpotifyApi.getMe().then((data) => data.body)
  }

  return {
    fetchRecommendations,
    fetchSavedSongs,
    getMe,
  }
}
