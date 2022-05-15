import { Logout } from "@mui/icons-material"
import { Avatar, Box, Button } from "@mui/material"
import axios from "axios"
import { useCookies } from "react-cookie"
import { useHistory } from "react-router-dom"

interface UserBoxProps {
  userData: SpotifyApi.CurrentUsersProfileResponse | undefined
}

const UserBox = ({ userData }: UserBoxProps) => {
  //   const history = useHistory()
  const [cookies, setCookie, removeCookie] = useCookies()

  const logout = () => {
    axios.post("https://www.spotify.com/logout/")
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
