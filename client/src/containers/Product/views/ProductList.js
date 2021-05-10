import React, { useRef } from "react"
import { Row, Col, Table } from "reactstrap"
import { BiSort } from "react-icons/bi"

import AddButton from "../../../components/Buttons/AddButton"
import DeleteButtonIcon from "../../../components/Buttons/DeleteButtonIcon"
import LinkEditButton from "../../../components/Buttons/LinkEditButton"
import SearchBox from "../../../components/Inputs/SearchBox"
import EmptyDataAlert from "../../../components/Alerts/EmptyDataAlert"
import CustomPagination from "../../../components/Pagination/CustomPagination"

import ProductDetailModal from "../components/ProductDetailModal"
import ProductCategorySelector from "../components/ProductCategorySelector"

import useProductList from "../hooks/useProductList"
import useProductDetail from "../hooks/useProductDetail"

const ProductList = () => {
    const modal = useRef()
    const {
        productList,
        total,
        filters,
        changeFilters,
        getData,
        removeData,
        onSort
    } = useProductList()

    const { id, setId, productDetail, confirmData } = useProductDetail()

    const openModal = (programId) => {
        !!programId ? setId(programId) : setId(0)
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
            <ProductDetailModal
                ref={modal}
                header={!!id ? "Edit product" : "Create product"}
                confirmText={!!id ? "Update" : "Create"}
                onCancel={onCancel}
                onConfirm={onConfirm}
                productDetail={productDetail}
            />
            <Row className="mb-2">
                <Col md={12}>
                    <h5>PRODUCT LIST</h5>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={2}>
                    <AddButton
                        text="Create product"
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
                <Col md={4}>
                    <ProductCategorySelector 
                        id={filters.category}
                        onChange={e => changeFilters({ category: (e && e.value) || null })}
                        isClearable
                        placeholder="Select category"
                    />
                </Col>
            </Row>
            <Row>
                <Col md={12} className="text-right">
                    Total of products: {total}
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={12}>
                    {productList && productList.length > 0 ? (
                        <Table bordered hover striped responsive size="sm">
                            <thead>
                                <tr>
                                    <th>
                                        Name {" "}
                                        <BiSort 
                                            size={14} 
                                            className="cursor-pointer" 
                                            onClick={() => onSort("name")}
                                        />
                                    </th>
                                    <th>Description</th>
                                    <th>
                                        Price {" "}
                                        <BiSort 
                                            size={14} 
                                            className="cursor-pointer" 
                                            onClick={() => onSort("price")}
                                        />
                                    </th>
                                    <th>
                                        Quantity {" "}
                                        <BiSort 
                                            size={14} 
                                            className="cursor-pointer" 
                                            onClick={() => onSort("quantity")}
                                        />
                                    </th>
                                    <th>Category</th>
                                    <th>CPU</th>
                                    <th>
                                        RAM {" "}
                                        <BiSort 
                                            size={14} 
                                            className="cursor-pointer" 
                                            onClick={() => onSort("ram")}
                                        />
                                    </th>
                                    <th>
                                        Hard disk
                                        <BiSort 
                                            size={14} 
                                            className="cursor-pointer" 
                                            onClick={() => onSort("hardDisk")}
                                        />
                                    </th>
                                    <th>VGA card</th>
                                    <th>Monitor</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productList.map((record) => (
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
                                        <td>
                                            {record.price}
                                        </td>
                                        <td>
                                            {record.quantity}
                                        </td>
                                        <td>
                                            {record.category?.name}
                                        </td>
                                        <td>
                                            {record.cpu}
                                        </td>
                                        <td>
                                            {record.ram}
                                        </td>
                                        <td>
                                            {record.hardDisk}
                                        </td>
                                        <td>
                                            {record.vgaCard}
                                        </td>
                                        <td>
                                            {record.monitor}
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
                        <EmptyDataAlert text="product" />
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

export default ProductList
