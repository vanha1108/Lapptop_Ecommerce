import { useState, useEffect } from "react"

import { view } from "../../../services/productService"

const useProductDetail = (_id) => {
    const html = `<html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
            <style>
                #video {
                    max-width: 100%;
                    height: 250px
                }
            </style>
        </head>
        <body>
            <div>
                <video id="video" controls autoplay>
                    <source src="$VIDEO_SRC$" />
                </video>
            </div>
        </body>
    </html>`

    useEffect(() => {
        view(_id)
    }, [_id])

    const [isVisible, setIsVisible] = useState(false)

    return { html, isVisible, setIsVisible }
}

export default useProductDetail