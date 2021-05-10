import React, {
    forwardRef,
    useState,
    useCallback,
    useImperativeHandle,
} from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"

const CommonModal = (props, ref) => {
    const {
        header,
        children,
        onConfirm,
        onCancel,
        confirmText,
        cancelText,
        noFooter,
        size,
    } = props

    const [isOpen, setIsOpen] = useState(false)

    const toggle = useCallback(() => {
        setIsOpen(!isOpen)
        isOpen && !!onCancel && onCancel()
    }, [isOpen, onCancel])

    const cancel = useCallback(() => {
        onCancel && onCancel()
        toggle()
    }, [toggle, onCancel])

    useImperativeHandle(ref, () => ({
        toggle,
    }))

    return (
        <Modal isOpen={isOpen} toggle={toggle} size={size}>
            <ModalHeader toggle={toggle}>{header}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            {!noFooter && (
                <ModalFooter className="text-right">
                    {onConfirm && (
                        <Button color="primary" onClick={onConfirm}>
                            {confirmText || "Confirm"}
                        </Button>
                    )}
                    <Button onClick={cancel}>{cancelText || "Cancel"}</Button>
                </ModalFooter>
            )}
        </Modal>
    )
}
export default forwardRef(CommonModal)
