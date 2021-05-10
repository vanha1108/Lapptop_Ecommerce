import React, { forwardRef } from "react"
import { Row, Col, Input, Label } from "reactstrap"
import shortid from "shortid"
import { Formik } from "formik"
import * as yup from "yup"

import RequiredLabel from "../../../components/Labels/RequiredLabel"
import CommonModal from "../../../components/Modals/CommonModal"
import ErrorHandler from "../../../components/Alerts/ErrorHandler"
import ProductCategorySelector from "./ProductCategorySelector"
import ProductImages from "./ProductImages"
import ProductVideo from "./ProductVideo"

const schema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string(),
    images: yup.array().of(yup.string()),
    price: yup
        .number()
        .required("Price is required")
        .test("test price", "Price must be positive", (value) => value > 0),
    quantity: yup.number(),
    category: yup.string(),
    cpu: yup.string(),
    ram: yup.string(),
    hardDisk: yup.string(),
    vgaCard: yup.string(),
    minitor: yup.string(),
    video: yup.string(),
    guaranteeDuration: yup
        .number()
        .required("Guarantee duration is required")
        .test("test guarantee duration", "Guarantee duration must be positive", value => value > 0)
})

const ProductDetailModal = (props, ref) => {
    const { header, confirmText, onConfirm, productDetail, onCancel } = props

    return (
        <Formik
            initialValues={productDetail}
            enableReinitialize
            validationSchema={schema}
            onSubmit={(values, actions) => {
                onConfirm(values)
                actions.resetForm()
            }}
        >
            {(formikProps) => {
                const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                } = formikProps

                return (
                    <CommonModal
                        header={header}
                        confirmText={confirmText}
                        onConfirm={handleSubmit}
                        ref={ref}
                        onCancel={onCancel}
                    >
                        <Row>
                            <Col md={12} className="mb-2">
                                <RequiredLabel text="Name" />
                                <Input
                                    name="name"
                                    placeholder="Name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur("name")}
                                />
                                {touched.name && errors.name && (
                                    <ErrorHandler text={errors.name} />
                                )}
                            </Col>
                            <Col md={12} className="mb-2">
                                <RequiredLabel text="Category" />
                                <ProductCategorySelector
                                    id={values.category}
                                    onChange={(e) =>
                                        setFieldValue("category", e.value)
                                    }
                                />
                                {touched.name && errors.name && (
                                    <ErrorHandler text={errors.name} />
                                )}
                            </Col>
                            <Col md={12} className="mb-2">
                                <Label>Description</Label>
                                <Input
                                    type="textarea"
                                    rows={5}
                                    name="description"
                                    placeholder="Description"
                                    value={values.description}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col md={12} className="mb-2">
                                <Row>
                                    <Col md={6}>
                                        <RequiredLabel text="Price" />
                                        <Input
                                            name="price"
                                            placeholder="Price"
                                            value={values.price}
                                            onChange={handleChange}
                                            onBlur={handleBlur("price")}
                                        />
                                        {touched.price && errors.price && (
                                            <ErrorHandler text={errors.price} />
                                        )}
                                    </Col>
                                    <Col md={6}>
                                        <RequiredLabel text="Guarantee duration (month)" />
                                        <Input
                                            name="guaranteeDuration"
                                            placeholder="Guarantee duration"
                                            value={values.guaranteeDuration}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12} className="mb-2">
                                <Row>
                                    <Col md={6}>
                                        <Label>CPU</Label>
                                        <Input
                                            name="cpu"
                                            placeholder="CPU"
                                            value={values.cpu}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Label>RAM</Label>
                                        <Input
                                            name="ram"
                                            placeholder="RAM"
                                            value={values.ram}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12} className="mb-2">
                                <Row>
                                    <Col md={6}>
                                        <Label>Hard disk</Label>
                                        <Input
                                            name="hardDisk"
                                            placeholder="Hard disk"
                                            value={values.hardDisk}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Label>VGA card</Label>
                                        <Input
                                            name="vgaCard"
                                            placeholder="VGA card"
                                            value={values.vgaCard}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12} className="mb-2">
                                <Row>
                                    <Col md={6}>
                                        <Label>Monitor</Label>
                                        <Input
                                            name="monitor"
                                            placeholder="Monitor"
                                            value={values.monitor}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Label>Quantity</Label>
                                        <Input
                                            name="quantity"
                                            placeholder="Quantity"
                                            value={values.quantity}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12} className="mb-2">
                                <Label>Images</Label>
                                <ProductImages
                                    images={values.images.map((item) => ({
                                        _id: shortid.generate(),
                                        isError: false,
                                        isDone: true,
                                        url: item,
                                    }))}
                                    setImages={(value) =>
                                        setFieldValue("images", value)
                                    }
                                />
                            </Col>
                            <Col md={12}>
                                <Label>Video</Label>
                                <ProductVideo
                                    video={values.video}
                                    setVideo={(value) =>
                                        setFieldValue("video", value)
                                    }
                                />
                            </Col>
                        </Row>
                    </CommonModal>
                )
            }}
        </Formik>
    )
}
export default forwardRef(ProductDetailModal)
