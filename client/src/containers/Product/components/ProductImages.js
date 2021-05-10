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

const ProductImages = ({ images, setImages }) => {
    const dispatch = useDispatch()
    const { app } = useFirebase()
    const [loading, setLoading] = useState(false)

    const handleImageChange = (e) => {
        e.preventDefault()

        let imageArray = new Array(e.target.files.length)
            .fill("")
            .map((_item) => ({
                _id: shortid.generate(),
                url: "",
                isError: false,
                isDone: false,
            }))

        setLoading(true)

        try {
            for (let i = 0; i < e.target.files.length; i++) {
                const file = e.target.files[0]
                const storageRef = app
                    .storage()
                    .ref(`PRODUCT-IMAGES/${shortid.generate()}-${file.name}`)
                const task = storageRef.put(file)

                const onProgress = (snapshot) => {}

                const onError = () => {
                    dispatch(
                        setAlert({
                            type: "danger",
                            message: "Something is wrong",
                        }),
                    )
                    imageArray[i].isError = true
                    imageArray[i].isDone = true
                }

                const onComplete = async () => {
                    const url = await storageRef.getDownloadURL()
                    imageArray[i].url = url
                    imageArray[i].isDone = true
                }

                task.on("state_changed", onProgress, onError, onComplete)

                const interval = setInterval(() => {
                    if (!imageArray.some((image) => !image.isDone)) {
                        setImages(
                            [...images, ...imageArray].map(
                                (image) => image.url,
                            ),
                        )
                        setLoading(false)
                        clearInterval(interval)
                    }
                }, 500)
            }
        } catch (err) {
            dispatch(
                setAlert({
                    type: "danger",
                    message: err.response?.data || err.message,
                }),
            )
            console.error(err)
        }
    }

    const removeImage = (_id) => {
        const removed = images
            .filter((image) => image._id !== _id)
            .map((image) => image.url)
        setImages(removed)
    }

    return (
        <div className="d-flex align-items-center overflow-x-auto">
            {loading && (
                <Progress value={100} animated className="flex-grow-1 mr-2" />
            )}
            {!loading &&
                images.map((image) => (
                    <div key={image._id} className="mr-2 position-relative">
                        {image.url ? (
                            <>
                                <img
                                    src={image.url}
                                    alt="product"
                                    className="product-image"
                                />
                                <FaWindowClose
                                    className="position-absolute product-image-close bg-white cursor-pointer hover-opacity"
                                    title="Delete"
                                    size={SMALL_ICON_SIZE}
                                    onClick={() => removeImage(image._id)}
                                />
                            </>
                        ) : image.isError ? (
                            "Failed"
                        ) : null}
                    </div>
                ))}
            <Input
                className="d-none"
                type="file"
                id="uploadFile"
                multiple
                onChange={handleImageChange}
                accept="image/x-png,image/jpeg"
            />
            <label htmlFor={!loading ? "uploadFile" : ""} className="mb-0">
                <FcAddImage
                    size={ICON_SIZE}
                    className="cursor-pointer"
                    title="Add image"
                />
            </label>
        </div>
    )
}

export default ProductImages
