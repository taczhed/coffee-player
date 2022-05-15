import axios from "axios"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { handleAccessToken } from "../store/accessTokenSlice"
import { useAppDispatch } from "../store/hooks"
import { useCookies } from "react-cookie"

export default function useSpotifyAuth(code: string | undefined) {
  const [refreshToken, setRefreshToken] = useState<string | undefined>()
  const [expiresIn, setExpiresIn] = useState<number | undefined>()
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"])
  const history = useHistory()
  const dispatch = useAppDispatch()
  // dispatch(handleAccessToken(res.data.accessToken))

  useEffect(() => {
    axios
      .post("http://localhost:8080/login", { code })
      .then((res) => {
        console.log(res.data)
        setCookie("accessToken", res.data.accessToken)
        setCookie("refreshToken", res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        // setRefreshToken(res.data.refreshToken)
        // dispatch(handleAccessToken(res.data.accessToken))
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
          // dispatch(handleAccessToken(res.data.accessToken))
        })
        .catch(() => {
          history.push("/")
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn, history])

  // return accessToken
}
