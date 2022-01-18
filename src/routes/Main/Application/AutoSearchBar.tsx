import { InputBase, Button, Box } from "@mui/material"
import React from "react"
import SearchIcon from "@mui/icons-material/Search"

const AutoSearchBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        py: 2,
        px: 3,
        background: "rgba(255, 255, 255, 0.15)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          display: "flex",
          borderRadius: 20,
        }}
      >
        <Button
          sx={{
            width: 48,
            height: 48,
            borderRadius: 0,
            background: "rgba(255, 255, 255, 0.15)",
          }}
        >
          <SearchIcon
            sx={{
              color: "white",
            }}
          />
        </Button>
        <InputBase
          placeholder="Search..."
          sx={{
            color: "white",
            fontSize: 16,
            width: "100%",
            background: "rgba(255, 255, 255, 0.15)",
            px: 1,
          }}
        />
      </Box>
    </Box>
  )
}

export default AutoSearchBar
