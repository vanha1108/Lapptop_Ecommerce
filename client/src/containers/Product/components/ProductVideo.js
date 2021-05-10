import React, { useState } from "react"
import { useDispatch } from "react-redux"
import shortid from "shortid"
import { Input, Progress } from "reactstrap"
import { FcAddImage } from "react-icons/fc"
import { FaWindowClose } from "react-icons/fa"

import useFirebase from "../../Firebase/hooks/useFirebase"
import { setAlert } from "../../../redux/commons/action"

const ICON_SIZE = 24
const SMALL_ICON_SIZE = 18

const ProductVideo = ({ video, setVideo }) => {
    const dispatch = useDispatch()
    const { app } = useFirebase()
    const [loading, setLoading] = useState(false)

    const handleVideoChange = (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            const file = e.target.files[0]
            const storageRef = app
                .storage()
                .ref(`PRODUCT-VIDEOS/${shortid.generate()}-${file.name}`)
            const task = storageRef.put(file)

            const onProgress = (snapshot) => {}

            const onError = () => {
                dispatch(
                    setAlert({
                        type: "danger",
                        message: "Something is wrong",
                    }),
                )
            }

            const onComplete = async () => {
                const url = await storageRef.getDownloadURL()
                setVideo(url)
            }

            task.on("state_changed", onProgress, onError, onComplete)
        } catch (err) {
            dispatch(
                setAlert({
                    type: "danger",
                    message: err.response?.data || err.message,
                }),
            )
        }
    }

    return (
        <div className="d-flex align-items-center justify-center product-video-container">
            {loading ? (
                <Progress value={100} animated className="flex-grow-1 mr-2" />
            ) : null}
            <Input
                className="d-none"
                type="file"
                id="uploadFile-video"
                multiple
                onChange={handleVideoChange}
                accept="video/*"
            />
            {!video ? (
                <div className="d-flex align-items-center justify-content-center h-100 w-100">
                    <label
                        htmlFor={!loading ? "uploadFile-video" : ""}
                        className="mb-0"
                    >
                        <FcAddImage
                            size={ICON_SIZE}
                            className="cursor-pointer"
                            title="Add video"
                        />
                    </label>
                </div>
            ) : (
                <div className="position-relative">
                    <video className="product-video" controls>
                        <source src={video} />
                    </video>
                    <FaWindowClose
                        className="position-absolute product-image-close cursor-pointer hover-opacity"
                        title="Delete"
                        size={SMALL_ICON_SIZE}
                        onClick={() => setVideo("")}
                    />
                </div>
            )}
        </div>
    )
}

export default ProductVideo
