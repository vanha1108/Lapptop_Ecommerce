import React, { Suspense } from "react"
import { Route, Switch } from "react-router-dom"
import { CContainer } from "@coreui/react"

import Page404 from "../containers/NotFound/views/Page404"

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

const TheContent = ({ routes }) => {
    return (
        <main className="c-main bg-white">
            <CContainer fluid className="h-100">
                <Suspense fallback={loading}>
                    <Switch>
                        {routes.map((route, idx) => {
                            return (
                                route.component && (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        render={(props) => (
                                            <route.component {...props} />
                                        )}
                                    />
                                )
                            )
                        })}
                        <Route path="/*" component={Page404} />
                    </Switch>
                </Suspense>
            </CContainer>
        </main>
    )
}

export default React.memo(TheContent)
