import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LoginView from "./components/Login/LoginView"
import Application from "./components/Main/Application"

const code = new URLSearchParams(window.location.search).get("code")

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" children={code ? <Application /> : <LoginView />} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
