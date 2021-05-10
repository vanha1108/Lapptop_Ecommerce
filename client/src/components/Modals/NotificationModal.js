import React, { useCallback } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { useSelector, useDispatch } from "react-redux"
import { setModal } from "../../redux/commons/action"

const COLORS = {
    DANGER: "#DC3545",
    WARNING: "#FFC107",
    SUCCESS: "#28A745",
    INFO: "#007BFF",
}

const modalInfo = (type) => {
    switch (type) {
        case "danger":
            return {
                header: "Error",
                color: COLORS.DANGER,
            }
        case "warning":
            return {
                header: "Warning",
                color: COLORS.WARNING,
            }
        case "success":
            return {
                header: "Success",
                color: COLORS.SUCCESS,
            }
        default:
            return {
                header: "Infomation",
                color: COLORS.INFO,
            }
    }
}

const NotificationModal = () => {
    const dispatch = useDispatch()
    const modal = useSelector((state) => state.commons.modal)
    const { isOpen, type, message, onConfirm } = modal

    const toggle = useCallback(() => {
        dispatch(setModal({ isOpen: !isOpen, type }))
    }, [isOpen, type, dispatch])

    const headerStyle = { backgroundColor: modalInfo(type).color }

    const confirm = () => {
        onConfirm && onConfirm()
        toggle()
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} fade>
            <ModalHeader toggle={toggle} style={headerStyle}>
                {modalInfo(type).header}
            </ModalHeader>
            <ModalBody>{message}</ModalBody>
            <ModalFooter>
                {onConfirm && (
                    <Button color={type} onClick={confirm}>
                        Confirm
                    </Button>
                )}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default NotificationModal
