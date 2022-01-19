import { Box, Typography, Button } from "@mui/material"
import React from "react"

interface AutoSearchBarItemProps {
  title: string
  artists: string
  imgSrc?: string
}

const AutoSearchBarItem = ({
  title,
  artists,
  imgSrc,
}: AutoSearchBarItemProps) => {
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
