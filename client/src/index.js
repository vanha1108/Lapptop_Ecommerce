import "react-app-polyfill/ie11" // For IE 11 support
import "react-app-polyfill/stable"
import "core-js"
import "./polyfill"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

import { Provider } from "react-redux"
import store from "./store"

import Loading from "./components/Loading/Loading"
import CommonAlert from "./components/Alerts/CommonAlert"
import NotificationModal from "./components/Modals/NotificationModal"

import { icons } from "./assets/icons"
React.icons = icons

ReactDOM.render(
    <Provider store={store}>
        <App />
        <Loading />
        <CommonAlert />
        <NotificationModal />
    </Provider>,
    document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
