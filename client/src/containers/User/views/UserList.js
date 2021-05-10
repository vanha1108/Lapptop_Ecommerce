import React, { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { Row, Col, Table } from "reactstrap"

import AddButton from "../../../components/Buttons/AddButton"
import DeleteButtonIcon from "../../../components/Buttons/DeleteButtonIcon"
import LinkEditButton from "../../../components/Buttons/LinkEditButton"
import SearchBox from "../../../components/Inputs/SearchBox"
import EmptyDataAlert from "../../../components/Alerts/EmptyDataAlert"
import CustomPagination from "../../../components/Pagination/CustomPagination"

import UserDetailModal from "../components/UserDetailModal"
import RoleSelector from "../components/RoleSelector"

import useUserList from "../hooks/useUserList"
import useUserDetail from "../hooks/useUserDetail"

const UserList = () => {
    const modal = useRef()
    const location = useLocation()
    const {
        userList,
        total,
        filters,
        changeFilters,
        getData,
        removeData,
    } = useUserList()

    const { id, setId, userDetail, confirmData } = useUserDetail()

    const openModal = (userId) => {
        !!userId ? setId(userId) : setId(0)
        modal && modal.current && modal.current.toggle()
    }

    const onConfirm = (values) => {
        confirmData(values, () => {
            modal && modal.current && modal.current.toggle()
            getData()
        })
    }

    const onRemove = (id) => {
        removeData(id)
    }

    const onCancel = () => setId(0)

    useEffect(() => {
        const email = location.state?.email
        const _id = location.state?._id

        if(!!email && !!_id) {
            changeFilters({ search: email })
            openModal(_id)
        }
    }, [location])

    return (
        <div className="animated fadeIn">
            <UserDetailModal
                ref={modal}
                header={!!id ? "Edit user" : "Create user"}
                confirmText={!!id ? "Update" : "Create"}
                onCancel={onCancel}
                onConfirm={onConfirm}
                userDetail={userDetail}
            />
            <Row className="mb-2">
                <Col md={12}>
                    <h5>USER LIST</h5>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={2}>
                    <AddButton
                        text="Create user"
                        onClick={() => openModal()}
                    />
                </Col>
                <Col md={6}>
                    <SearchBox
                        initValue={filters.search}
                        onSearch={(searchString) =>
                            changeFilters({ search: searchString })
                        }
                    />
                </Col>
                <Col md={2}>
                    <RoleSelector 
                        isClearable
                        placeholder="Select role"
                        role={filters.role}
                        onChange={e => changeFilters({ role: e ? e.value : null })}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={12} className="text-right">
                    Total of users: {total}
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={12}>
                    {userList && userList.length > 0 ? (
                        <Table bordered hover striped responsive size="sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Roles</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map((record) => (
                                    <tr key={record._id}>
                                        <td>
                                            <LinkEditButton
                                                label={record.name}
                                                onClick={() =>
                                                    openModal(record._id)
                                                }
                                            />
                                        </td>
                                        <td>{record.email}</td>
                                        <td>
                                            {record.phone}
                                        </td>
                                        <td>
                                            {record.roles.join(", ")}
                                        </td>

                                        <td className="text-center">
                                            <DeleteButtonIcon
                                                onClick={() =>
                                                    onRemove(record._id)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <EmptyDataAlert text="user" />
                    )}
                </Col>
                <Col md={12}>
                    <CustomPagination
                        total={total}
                        filters={filters}
                        changeLimit={(limit) => changeFilters({ limit })}
                        changePage={(page) => changeFilters({ page })}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default UserList
