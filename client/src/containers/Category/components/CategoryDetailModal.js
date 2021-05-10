import React, { forwardRef } from "react"
import { Row, Col, Input, Label } from "reactstrap"
import { Formik } from "formik"
import * as yup from "yup"

import RequiredLabel from "../../../components/Labels/RequiredLabel"
import CommonModal from "../../../components/Modals/CommonModal"
import ErrorHandler from "../../../components/Alerts/ErrorHandler"

const schema = yup.object({
    name: yup.string().required("Name is required"),
})
const CategoryDetailModal = (props, ref) => {
    const { header, confirmText, onConfirm, categoryDetail, onCancel } = props

    return (
        <Formik
            initialValues={categoryDetail}
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
                            <Col md={12}>
                                <Label>Description</Label>
                                <Input
                                    type="textarea"
                                    rows={5}
                                    name="description"
                                    placeholder="Description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur("description")}
                                />
                            </Col>
                        </Row>
                    </CommonModal>
                )
            }}
        </Formik>
    )
}
export default forwardRef(CategoryDetailModal)
