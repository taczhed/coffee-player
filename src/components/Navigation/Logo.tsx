import React from "react"
import { Link } from "react-router-dom"
const logo = require("../../assets/logo/white.png")

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="coffee-player-logo" width="100%" />
    </Link>
  )
}

export default Logo
