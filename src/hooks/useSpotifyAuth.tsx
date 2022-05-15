import axios from "axios"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useAppDispatch } from "../store/hooks"
import { useCookies } from "react-cookie"

export default function useSpotifyAuth(code: string | undefined) {
  const [refreshToken, setRefreshToken] = useState<string | undefined>()
  const [expiresIn, setExpiresIn] = useState<number | undefined>()
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"])
  const history = useHistory()

  useEffect(() => {
    axios
      .post("http://localhost:8080/login", { code })
      .then((res) => {
        setCookie("accessToken", res.data.accessToken)
        setCookie("refreshToken", res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        history.push("/")
      })
      .catch(() => history.push("/"))
  }, [code, history, setCookie])

  useEffect(() => {
    if (!expiresIn) return
    const refreshToken = cookies.refreshToken
    const interval = setInterval(() => {
      axios
        .post("http://localhost:8080/refresh", { refreshToken })
        .then((res) => {
          console.log(res.data)
          setCookie("accessToken", res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch(() => {
          history.push("/")
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn, history])
}
