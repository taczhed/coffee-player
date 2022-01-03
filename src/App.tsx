import * as React from "react"
import "./App.css"
// import logo from "./assets/logo/white.png"
import Button from "@mui/material/Button"

const logo = require("./assets/logo/white.png")

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} width="512" height="512" alt="logo" />
        <Button variant="contained">Login in with Spotify</Button>
      </header>
    </div>
  )
}

export default App
