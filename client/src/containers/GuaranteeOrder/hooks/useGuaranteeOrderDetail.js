import { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import shortid from "shortid"

import { setLoading, setAlert } from "../../../redux/commons/action"
import {
  getById,
  getOrderInfo as getOrder,
  create,
  update,
} from "../../../services/guaranteeOrderServices"

const GUARANTEE_ORDER_STATUS = {
  RECEIVED: "Received",
  FIXING: "Fixing",
  RETURNED_TO_CUSTOMER: "Returned to customer",
}

const createInitValue = {
  orderId: "",
  productId: "",
  note: "",
}

const updateInitValue = {
  user: {},
  product: {},
  note: "",
  detail: [],
  status: GUARANTEE_ORDER_STATUS.RECEIVED,
  isPaid: false,
}

const useGuaranteeOrderDetail = () => {
  const dispatch = useDispatch()
  const [id, setId] = useState(0)
  const [orderInfo, setOrderInfo] = useState(null)
  const [createData, setCreateData] = useState(createInitValue)
  const [updateData, setUpdateData] = useState(updateInitValue)

  const changeCreateData = (objValue) => {
    setCreateData({
      ...createData,
      ...objValue,
    })
  }

  const changeUpdateData = (objValue) => {
    setUpdateData({
      ...updateData,
      ...objValue,
    })
  }

  const addDetail = () => {
    changeUpdateData({
      detail: [
        ...updateData.detail,
        {
          guid: shortid.generate(),
          content: "",
          price: 0,
        },
      ],
    })
  }

  const updateDetail = (guid, valueObject) => {
    const detailCloner = JSON.parse(JSON.stringify(updateData.detail))
    const thisDetail = detailCloner.find((item) => item.guid === guid)
    if (!thisDetail) return
    for (const key of Object.keys(valueObject)) {
      thisDetail[key] = valueObject[key]
    }
    changeUpdateData({ detail: detailCloner })
  }

  const removeDetail = (guid) => {
    changeUpdateData({
      detail: updateData.detail.filter((item) => item.guid !== guid),
    })
  }

  const getData = useCallback(async () => {
    dispatch(setLoading(true))
    try {
      const res = await getById(id)
      setUpdateData({
          ...res.data,
          detail: res.data.detail?.map(item => ({
              ...item,
              guid: shortid.generate()
          }))
      })
    } catch (err) {
      dispatch(
        setAlert({
          type: "danger",
          message: err.response?.data || err.message,
        })
      )
    }
    dispatch(setLoading(false))
  }, [id, dispatch, setUpdateData])

  const getOrderInfo = useCallback(async () => {
    dispatch(setLoading(true))
    try {
      const { orderId, productId } = createData
      const res = await getOrder({ orderId, productId })
      setOrderInfo(res.data)
    } catch (err) {
      dispatch(
        setAlert({
          type: "danger",
          message: err.response?.data || err.message,
        })
      )
    }
    dispatch(setLoading(false))
  }, [createData, dispatch])

  useEffect(() => {
    if (!!id) {
      getData()
    } else {
      setCreateData(createInitValue)
      setUpdateData(updateInitValue)
      setOrderInfo(null)
    }
  }, [id, getData])

  const confirmData = useCallback(
    async (cb) => {
      dispatch(setLoading(true))
      try {
        await (!!id ? update(id, updateData) : create(createData))
        dispatch(
          setAlert({
            type: "success",
            message: `${
              !!id ? "Update" : "Create"
            } guarantee order successfully`,
          })
        )
        cb && cb()
        !!id && setId(0)
      } catch (err) {
        dispatch(
          setAlert({
            type: "danger",
            message: err.response?.data || err.message,
          })
        )
      }
      dispatch(setLoading(false))
    },
    [id, dispatch, createData, updateData]
  )
  return {
    id,
    setId,
    createData,
    updateData,
    orderInfo,
    confirmData,
    getOrderInfo,
    changeCreateData,
    changeUpdateData,
    addDetail,
    updateDetail,
    removeDetail,
  }
}

export default useGuaranteeOrderDetail
