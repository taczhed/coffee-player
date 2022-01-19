import React from "react"
import { Link } from "react-router-dom"
const logo = require("../../../assets/logo/white.png")

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} width="164" alt="coffee-player-logo" />
    </Link>
  )
}

export default Logo
