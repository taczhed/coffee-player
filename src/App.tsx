import { Routes, Route } from "react-router-dom"
import LoginView from "./routes/Login/LoginView"
import MainView from "./routes/Main/MainView"

const code = new URLSearchParams(window.location.search).get("code")

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={code ? <MainView code={code} /> : <LoginView />}
        />
      </Routes>
    </div>
  )
}

export default App
