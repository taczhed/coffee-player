import axios from "axios"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { handleAccessToken } from "../store/accessTokenSlice"
import { useAppDispatch } from "../store/hooks"

export default function useSpotifyAuth(code: string | undefined) {
  const [refreshToken, setRefreshToken] = useState<string | undefined>()
  const [expiresIn, setExpiresIn] = useState<number | undefined>()

  const history = useHistory()

  const dispatch = useAppDispatch()
  // dispatch(handleAccessToken(res.data.accessToken))

  useEffect(() => {
    axios
      .post("http://localhost:8080/login", { code })
      .then((res) => {
        console.log(res.data)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)

        dispatch(handleAccessToken(res.data.accessToken))

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
          dispatch(handleAccessToken(res.data.accessToken))
          setExpiresIn(res.data.expiresIn)
        })
        .catch(() => {
          history.push("/")
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn, history])

  // return accessToken
}
