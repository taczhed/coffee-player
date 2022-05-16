import { Avatar, Box, Button } from "@mui/material"
import { useCookies } from "react-cookie"

interface UserBoxProps {
  userData: SpotifyApi.CurrentUsersProfileResponse | undefined
}

const UserBox = ({ userData }: UserBoxProps) => {
  const [cookies, setCookie, removeCookie] = useCookies()

  const logout = () => {
    const spotifyLogoutWindow = window.open(
      "https://www.spotify.com/logout/",
      "Spotify Logout",
      "width=700,height=500,top=40,left=40",
    )
    setTimeout(() => spotifyLogoutWindow?.close(), 4000)
    removeCookie("accessToken")
    removeCookie("refreshToken")
    window.location.reload()
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        alt={userData?.display_name}
        src={userData?.images ? userData?.images[0].url : "error"}
        sx={{
          width: 48,
          height: 48,
          mb: 1,
          border: "2px solid white",
        }}
      />

      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          color: "#FFFFFF",
          fontFamily: "Barlow, sans-serif",
          fontWeight: 500,
        }}
      >
        {`Hi, ${userData?.display_name}`}
      </Box>

      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          color: "#BBBBBB",
          fontFamily: "Barlow, sans-serif",
          fontSize: 9,
        }}
      >
        {userData?.email}
      </Box>

      <Button
        sx={{
          mt: { xs: 0, sm: 1 },
          px: { xs: 0, sm: 5 },
          fontSize: { xs: 8, sm: 12 },
          backgroundColor: "rgba(255,255,255,0.30)",
        }}
        onClick={() => logout()}
      >
        LOGOUT
      </Button>
    </Box>
  )
}

export default UserBox
