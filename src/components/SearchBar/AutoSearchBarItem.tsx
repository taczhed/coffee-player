import React from "react"
import { Box, Typography, Button } from "@mui/material"
import { handleCurrentTrack } from "../../store/currentTrackSlice"
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
        px: {
          xs: 0.5,
          sm: 2,
        },
        py: {
          xs: 0.5,
          sm: 1,
        },
        display: "flex",
        color: "#000000",
        justifyContent: "flex-start",
        borderRadius: 0,
      }}
      // onClick={() => dispatch(handleCurrentSong({ uri: uri }))}
    >
      <img src={imgSrc} alt={title} />
      <Box
        sx={{
          px: {
            xs: 0.5,
            sm: 1,
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: {
              xs: 12,
              sm: 16,
            },
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="overline"
          sx={{
            fontSize: {
              xs: 9,
              sm: 14,
            },
          }}
        >
          {artists}
        </Typography>
      </Box>
    </Button>
  )
}

export default AutoSearchBarItem
