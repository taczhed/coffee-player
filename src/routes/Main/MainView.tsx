import Box from "@mui/material/Box"
import useSpotifyAuth from "../../useSpotifyAuth"
const background = require("../../assets/background/gradient1.jpeg")

interface MainViewProps {
  code: string | null
}

const MainView = ({ code }: MainViewProps) => {
  const accessToken = useSpotifyAuth(code)

  return (
    <Box
      sx={{
        // backgroundColor: "#262626",
        backgroundImage: `url(${background})`,
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          background: `rgba(255,255,255,0.2)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          px: 4,
          py: 6,
          borderRadius: 12,
        }}
      >
        {code}
      </Box>
    </Box>
  )
}

export default MainView
