export const reduceTracks = (
  data: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> | undefined,
) => {
  if (!data) return
  let tracks = data.items.map((track) => {
    const theSmallestAlbum = track.album.images.reduce((smallest, current) => {
      if (current.height && smallest.height && current.height < smallest.height)
        return current
      else return smallest
    }, track.album.images[0])

    let artists = track.artists.map((artist) => artist.name)

    return {
      artists: artists,
      title: track.name,
      uri: track.uri,
      albumUrl: theSmallestAlbum?.url,
    }
  })
  return tracks
}

export const smashArtists = (artistsArray: Array<string>) => {
  let artistsString = ""
  artistsArray.map((artist) => (artistsString += `${artist}, `))
  return artistsString.slice(0, -2)
}
