const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const SpotifyWebApi = require("spotify-web-api-node")
const port = 8080

app.use(cors())
app.use(bodyParser.json())

const auth = require("../src/auth.json")

app.post("/login", async (req, res) => {
  console.log("Login in!")
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: auth.clientId,
    clientSecret: auth.clientSecret,
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      // console.log(data)
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch((error) => {
      console.log(`Login error: ${error}`)
      res.sendStatus(400)
    })
})

app.post("/refresh", (req, res) => {
  console.log("Token is refreshing!")
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: auth.clientId,
    clientSecret: auth.clientSecret,
    refreshToken,
  })

  spotifyApi.refreshAccessToken().then(
    (data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    },
    (error) => console.log(`Refresh error: ${error}`),
  )
})

app.listen(port, () => {
  console.log(`Coffee player server listening at http://localhost:${port}`)
})
