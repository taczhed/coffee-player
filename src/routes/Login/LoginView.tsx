import Link from "@mui/material/Link"
import Box from "@mui/material/Box"

const logo = require("../../assets/logo/white.png")
const background = require("../../assets/background/gradient1.jpeg")

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=b92eae32f8f74940addf1c460abd6e78&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-library-read%20user-library-modify"

const LoginView = () => {
  return (
    <Box
      sx={{
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
          background: `rgba(255,255,255,0.15)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          px: 4,
          py: 6,
          borderRadius: 12,
        }}
      >
        <img src={logo} width="280" height="280" alt="coffee-player-logo" />
        <Link
          sx={{
            fontFamily: "Barlow, sans-serif",
            fontWeight: 500,
            textTransform: "uppercase",
            fontSize: 12,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            color: "#ffffff",
            border: "2px solid transparent",
            p: 2,
            borderRadius: 2,
            verticalAlign: "center",
            justifyContent: "center",
            transition: "0.2s",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#ffffff",
              border: "2px solid #ffffff",
              textDecoration: "none",
            },
          }}
          href={AUTH_URL}
        >
          Connect with Spotify
        </Link>
      </Box>
    </Box>
  )
}

export default LoginView
