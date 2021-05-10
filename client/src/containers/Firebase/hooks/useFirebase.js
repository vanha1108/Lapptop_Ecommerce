import { useEffect, useCallback, useRef } from "react"
import firebase from "firebase"
import "firebase/storage"

import { getFirebaseKey } from "../../../services/keyService"

const useFirebase = () => {
    const app = useRef()

    const getKey = useCallback(async () => {
        const res = await getFirebaseKey()
        if (!app.current) {
            try {
                app.current = firebase.initializeApp(res.data)
            } catch {
                app.current = firebase
            }
        }
    }, [])

    useEffect(() => {
        getKey()
    }, [])

    return { app: app.current }
}

export default useFirebase
