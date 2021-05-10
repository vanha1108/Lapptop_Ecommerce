import { useState } from "react"
import { useDispatch } from "react-redux"
import { Alert } from "react-native"
import * as firebase from "firebase"
import shortid from "shortid"

import { setLoading } from "../../../redux/commons/action"
import navigation from "../../../navigations/rootNavigation"
import screens from "../../../assets/constants/screens"
import { create, update } from "../../../services/guaranteeOrderService"
import { firebaseConfig } from "../../../utils/constants"

const defaultData = {
    productName: "",
    guaranteeDuration: 0,
    startDate: 0,
    storeAddress: "",
    storePhone: "",
    imageUrl: ""
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const useGuaranteeOrderDetail = () => {
    const dispatch = useDispatch()
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [image, setImage] = useState(null)

    const uploadImageAsync = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.onload = function() {
            resolve(xhr.response)
          };
          xhr.onerror = function(e) {
            reject(new TypeError('Network request failed'))
          };
          xhr.responseType = 'blob'
          xhr.open('GET', uri, true)
          xhr.send(null);
        });
      
        const ref = firebase
          .storage()
          .ref(`CUSTOMER-GUARANTEE/${shortid.generate()}`)

        const snapshot = await ref.put(blob)
      
        blob.close();
      
        return await snapshot.ref.getDownloadURL()
      }

    const confirmData = async (data) => {
        dispatch(setLoading(true))

        try {
            if (image) {
                data.imageUrl = await uploadImageAsync(image)
                setImage(null)
            }

            if (data._id) {
                await update(data._id, data)
            } else {
                await create(data)
            }

            Alert.alert(`${data._id ? "Update" : "Create"} successfully`, "", [
                {
                    text: "OK",
                    onPress: () => navigation.navigate(screens.GUARANTEE_ORDER_LIST)
                }
            ])
        } catch(err) {
            Alert.alert(err.response?.data || err.message)
        }

        dispatch(setLoading(false))
    }

    return { defaultData, confirmData, showDatePicker, setShowDatePicker, image, setImage }
}

export default useGuaranteeOrderDetail