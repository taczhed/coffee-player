import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LoginView from "./routes/Login/LoginView"
import MainView from "./routes/Main/MainView"

const code = new URLSearchParams(window.location.search).get("code")

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path="/"
            children={code ? <MainView code={code} /> : <LoginView />}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
