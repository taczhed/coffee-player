import { ContentPasteSearchOutlined } from "@mui/icons-material"
import axios, { AxiosResponse } from "axios"
import { useState, useEffect } from "react"

export default function useSpotifyRecommendations(
  accessToken: string | undefined,
) {
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

  const getRecentlyPlayedTracks = () => {
    return axios
      .get(`https://api.spotify.com/v1/me/player/recently-played/?limit=50`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((tracks) => {
        return tracks.data.items
      })
  }

  const countSeeds = (
    recentlyPlayedTracks: Array<any>,
    usersTopArtists: Array<any>,
  ) => {
    let seeds_queries = ["", "", ""] //seed_artists_query, seed_genres_query, seed_tracks_query

    for (let i = 0; i < 2; i++) {
      for (let t = 0; t < 5; t++) {
        const randomTrackIndex = Math.floor(
          Math.random() * recentlyPlayedTracks.length,
        )
        if (i === 0)
          seeds_queries[0] += `%2C${recentlyPlayedTracks[randomTrackIndex].track.artists[0].id}`
        else if (i === 1)
          seeds_queries[2] += `%2C${recentlyPlayedTracks[randomTrackIndex].track.id}`
        recentlyPlayedTracks.splice(randomTrackIndex, 1)
      }
    }

    for (let t = 0; t < 1; t++) {
      const randomArtistIndex = Math.floor(
        Math.random() * usersTopArtists.length,
      )
      // console.log(usersTopArtists[randomArtistIndex])
      if (usersTopArtists[randomArtistIndex].genres[0]) {
        seeds_queries[1] += `%2C${usersTopArtists[
          randomArtistIndex
        ].genres[0].replaceAll(" ", "%20")}`
        usersTopArtists.splice(randomArtistIndex, 1)
      } else {
        t--
      }
    }

    // console.log(seeds_queries[1])

    return {
      seed_artists_query: seeds_queries[0].slice(3, seeds_queries[0].length),
      seed_genres_query: seeds_queries[1].slice(3, seeds_queries[1].length),
      seed_tracks_query: seeds_queries[2].slice(3, seeds_queries[2].length),
    }
  }

  const fetchRecommendations = async () => {
    const recentlyPlayedTracks = await getRecentlyPlayedTracks()
    const usersTopArtists = await getUsersTop("artists")

    const { seed_artists_query, seed_genres_query, seed_tracks_query } =
      countSeeds(recentlyPlayedTracks, usersTopArtists.data.items)

    return {
      recomendationsBasedOnArtists: await axios
        .get(
          `https://api.spotify.com/v1/recommendations?seed_artists=${seed_artists_query}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((recomendations) => {
          return recomendations.data.tracks
        }),

      recomendationsBasedOnGenres: await axios
        .get(
          `https://api.spotify.com/v1/recommendations?seed_genres=${seed_genres_query}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((recomendations) => {
          return recomendations.data.tracks
        }),

      recomendationsBasedOnRecentlyPlayedTracks: await axios
        .get(
          `https://api.spotify.com/v1/recommendations?seed_tracks=${seed_tracks_query}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((recomendations) => {
          return recomendations.data.tracks
        }),
    }
  }

  return {
    fetchRecommendations,
  }
}
