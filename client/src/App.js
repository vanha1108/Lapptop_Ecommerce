import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./scss/style.scss"

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

// Containers
const TheLayout = React.lazy(() => import("./layouts/TheLayout"))

// Pages
const Login = React.lazy(() => import("./containers/Login/views/Login"))

class App extends Component {
    render() {
        return (
            <Router>
                <React.Suspense fallback={loading}>
                    <Switch>
                        <Route
                            exact
                            path="/login"
                            name="Login Page"
                            render={(props) => <Login {...props} />}
                        />
                        <Route
                            path="/"
                            name="Home"
                            render={(props) => <TheLayout {...props} />}
                        />
                    </Switch>
                </React.Suspense>
            </Router>
        )
    }
}

export default App
