import { Box, Button } from "@mui/material"
import React from "react"

interface NavigationElementProps {
  name: string
  url: string
  icon: JSX.Element
}

const NavigationElement = ({ name, url, icon }: NavigationElementProps) => {
  return (
    <Button
      sx={{
        width: "100%",
        py: 3,
        px: 2,
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <Box
        sx={{
          pr: 1,
          pt: 1,
          borderRight: "1.75px solid rgba(255,255,255,0.5)",
        }}
      >
        {icon}
      </Box>
      <Box
        sx={{
          pl: 1,
          fontFamily: "Barlow, sans-serif",
          fontWeight: 500,
          textTransform: "uppercase",
          fontSize: 12,
          lineHeight: "28px",
        }}
      >
        {name}
      </Box>
    </Button>
  )
}

export default NavigationElement
