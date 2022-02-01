import { Box, Typography, Button } from "@mui/material"
import React from "react"
import { handleCurrentSong } from "../../store/currentSongSlice"
import { useAppDispatch } from "../../store/hooks"

interface AutoSearchBarItemProps {
  title: string
  uri: string
  artists: string
  imgSrc?: string
}

const AutoSearchBarItem = ({
  title,
  uri,
  artists,
  imgSrc,
}: AutoSearchBarItemProps) => {
  const dispatch = useAppDispatch()

  return (
    <Button
      sx={{
        textAlign: "left",
        px: 2,
        py: 1,
        display: "flex",
        color: "#000000",
        justifyContent: "flex-start",
        borderRadius: 0,
      }}
      onClick={() => dispatch(handleCurrentSong(uri))}
    >
      <img src={imgSrc} alt={title} />
      <Box
        sx={{
          px: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="body1">{title}</Typography>
        <Typography variant="overline">{artists}</Typography>
      </Box>
    </Button>
  )
}

export default AutoSearchBarItem
