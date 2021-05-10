import React, { useRef } from "react"
import { Row, Col, Table } from "reactstrap"

import AddButton from "../../../components/Buttons/AddButton"
import DeleteButtonIcon from "../../../components/Buttons/DeleteButtonIcon"
import LinkEditButton from "../../../components/Buttons/LinkEditButton"
import SearchBox from "../../../components/Inputs/SearchBox"
import EmptyDataAlert from "../../../components/Alerts/EmptyDataAlert"
import CustomPagination from "../../../components/Pagination/CustomPagination"

import CategoryDetailModal from "../components/CategoryDetailModal"

import useCategoryList from "../hooks/useCategoryList"
import useCategoryDetail from "../hooks/useCategoryDetail"

const CategoryList = () => {
    const modal = useRef()
    const {
        categoryList,
        total,
        filters,
        changeFilters,
        getData,
        removeData,
    } = useCategoryList()

    const { id, setId, categoryDetail, confirmData } = useCategoryDetail()

    const openModal = (categoryId) => {
        !!categoryId ? setId(categoryId) : setId(0)
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

    return (
        <div className="animated fadeIn">
            <CategoryDetailModal
                ref={modal}
                header={!!id ? "Edit category" : "Create category"}
                confirmText={!!id ? "Update" : "Create"}
                onCancel={onCancel}
                onConfirm={onConfirm}
                categoryDetail={categoryDetail}
            />
            <Row className="mb-2">
                <Col md={12}>
                    <h5>CATEGORY LIST</h5>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={2}>
                    <AddButton
                        text="Create category"
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
            </Row>
            <Row>
                <Col md={12} className="text-right">
                    Total of categories: {total}
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={12}>
                    {categoryList && categoryList.length > 0 ? (
                        <Table bordered hover striped responsive size="sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryList.map((record) => (
                                    <tr key={record._id}>
                                        <td>
                                            <LinkEditButton
                                                label={record.name}
                                                onClick={() =>
                                                    openModal(record._id)
                                                }
                                            />
                                        </td>
                                        <td>{record.description}</td>
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
                        <EmptyDataAlert text="category" />
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

export default CategoryList
