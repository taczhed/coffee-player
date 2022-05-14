import { Box, Button } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

interface NavigationElementProps {
  name: string
  url: string
  icon: JSX.Element
}

const NavigationElement = ({ name, url, icon }: NavigationElementProps) => {
  return (
    <Link to={`${url}`} style={{ textDecoration: "none", width: "100%" }}>
      <Button
        sx={{
          width: "100%",
          py: {
            xs: 1.5,
            sm: 3,
          },
          px: 2,
          display: "flex",
          justifyContent: {
            xs: "center",
            sm: "flex-start",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Box
          sx={{
            pr: {
              xs: 0,
              sm: 1,
            },
            mr: {
              xs: 0,
              sm: 1,
            },
            borderRight: {
              xs: "none",
              sm: "1.75px solid rgba(255,255,255,0.5)",
            },
          }}
        >
          {icon}
        </Box>
        <Box
          sx={{
            // display: {
            //   xs: "none",
            //   sm: "block",
            // },
            // pl: 1,
            fontFamily: "Barlow, sans-serif",
            fontWeight: 500,
            textTransform: "uppercase",
            textAlign: "center",
            fontSize: {
              xs: 8,
              sm: 12,
            },
            lineHeight: {
              xs: 0,
              sm: "28px",
            },
          }}
        >
          {name}
        </Box>
      </Button>
    </Link>
  )
}

export default NavigationElement
