import { WindowSharp } from "@mui/icons-material"
import axios from "axios"
import React, { useState, useEffect } from "react"

export default function useSpotifyAuth(code: string | null) {
  const [accessToken, setAccessToken] = useState<string | null>(code)
  const [refreshToken, setRefreshToken] = useState<string | undefined>()
  const [expiresIn, setExpiresIn] = useState<number | undefined>()

  useEffect(() => {
    axios
      .post("http://localhost:8080/login", { code })
      .then((res) => {
        console.log(res.data)
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, "", "/")
      })
      .catch(() => {
        window.location.assign("/")
      })
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios
        .post("http://localhost:8080/refresh", { refreshToken })
        .then((res) => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch(() => {
          window.location.assign("/")
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken
}
