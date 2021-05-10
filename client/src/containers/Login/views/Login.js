import React from "react"
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"

import useLogin from "../hooks/useLogin"

const Login = () => {
    const { data, changeData, userLogin } = useLogin()

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="4">
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm onSubmit={e => {
                                    e.preventDefault()
                                    userLogin()
                                }}>
                                    <h1>Login</h1>
                                    <p className="text-muted">
                                        Sign In to your account
                                    </p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-user" />
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput
                                            type="text"
                                            placeholder="Email"
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                changeData({
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-lock-locked" />
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput
                                            type="password"
                                            placeholder="Password"
                                            autoComplete="current-password"
                                            value={data.password}
                                            onChange={(e) =>
                                                changeData({
                                                    password: e.target.value,
                                                })
                                            }
                                        />
                                    </CInputGroup>
                                    <CRow>
                                        <CCol xs="6">
                                            <CButton
                                                color="primary"
                                                className="px-4"
                                                type="submit"
                                            >
                                                Login
                                            </CButton>
                                        </CCol>
                                        <CCol xs="6" className="text-right">
                                            <CButton
                                                color="link"
                                                className="px-0"
                                            >
                                                Forgot password?
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
