import React, { forwardRef } from "react"
import { Row, Col, Input, Label, CustomInput } from "reactstrap"
import { Formik } from "formik"
import * as yup from "yup"

import RequiredLabel from "../../../components/Labels/RequiredLabel"
import CommonModal from "../../../components/Modals/CommonModal"
import ErrorHandler from "../../../components/Alerts/ErrorHandler"

const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    address: yup.string(),
    phone: yup.string(),
    roles: yup.array().of(yup.string()).min(1, "Roles is required"),
})

const roles = ["Admin", "Seller", "Guest", "Technician"]

const UserDetailModal = (props, ref) => {
    const { header, confirmText, onConfirm, userDetail, onCancel } = props

    return (
        <Formik
            initialValues={userDetail}
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

                const toggleRole = (role) => {
                    if (values.roles.includes(role)) {
                        setFieldValue(
                            "roles",
                            values.roles.filter((r) => r !== role),
                        )
                        return
                    }

                    setFieldValue("roles", [...values.roles, role])
                }

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
                                <RequiredLabel text="Email" />
                                <Input
                                    name="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur("email")}
                                />
                                {touched.email && errors.email && (
                                    <ErrorHandler text={errors.email} />
                                )}
                            </Col>
                            <Col md={12} className="mb-2">
                                <RequiredLabel text="Roles" />
                                <Row>
                                    {roles.map((role) => (
                                        <Col md={3} key={role}>
                                            <CustomInput
                                                type="checkbox"
                                                id={`role-checkbox-${role}`}
                                                label={role}
                                                checked={values.roles.includes(
                                                    role,
                                                )}
                                                onChange={() =>
                                                    toggleRole(role)
                                                }
                                            />
                                        </Col>
                                    ))}
                                </Row>
                                {touched.roles && errors.roles && (
                                    <ErrorHandler text={errors.roles} />
                                )}
                            </Col>
                            <Col md={12} className="mb-2">
                                <Label>Address</Label>
                                <Input
                                    name="address"
                                    placeholder="Address"
                                    value={values.address}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col md={12} className="mb-2">
                                <Label>Phone</Label>
                                <Input
                                    name="phone"
                                    placeholder="Phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                    </CommonModal>
                )
            }}
        </Formik>
    )
}
export default forwardRef(UserDetailModal)
