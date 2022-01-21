import axios from "axios"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

export default function useSpotifyAuth(code: string | undefined) {
  const [accessToken, setAccessToken] = useState<string | undefined>()
  const [refreshToken, setRefreshToken] = useState<string | undefined>()
  const [expiresIn, setExpiresIn] = useState<number | undefined>()

  const history = useHistory()

  useEffect(() => {
    axios
      .post("http://localhost:8080/login", { code })
      .then((res) => {
        console.log(res.data)
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        history.push("/")
      })
      .catch(() => {
        history.push("/")
      })
  }, [code, history])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios
        .post("http://localhost:8080/refresh", { refreshToken })
        .then((res) => {
          console.log(res.data)
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch(() => {
          history.push("/")
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn, history])

  return accessToken
}
