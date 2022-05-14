import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LoginView from "./components/Login/LoginView"
import MainView from "./components/Main/MainView"

const code = new URLSearchParams(window.location.search).get("code")

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" children={code ? <MainView /> : <LoginView />} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
