const { CustomerGuaranteeOrder } = require("../models")

const get = async ({ userId, search }) => {
  const filter =
    !!search && !!search.trim()
      ? { productName: { $regex: search, $options: "i" }, user: userId }
      : { user: userId }

  const items = await CustomerGuaranteeOrder
    .find(filter)
    .sort({ createdAt: -1 })

  return items.map(item => {
    const endDate = item.startDate + item.guaranteeDuration * 30 * 24 * 60 * 60 * 1000
    const guaranteeServiceOn = new Date().getTime() < endDate

    return {
      _id: item._id,
      productName: item.productName,
      guaranteeDuration: item.guaranteeDuration,
      startDate: item.startDate,
      endDate,
      guaranteeServiceOn,
      storeAddress: item.storeAddress,
      storePhone: item.storePhone,
      imageUrl: item.imageUrl,
    }
  })
}

const getById = async (_id) => {
  const customerGuaranteeOrder = await CustomerGuaranteeOrder.findOne({ _id })
  if (!customerGuaranteeOrder)
    throw new Error("CustomerGuaranteeOrder doesn't exist")

  const endDate = customerGuaranteeOrder.startDate + customerGuaranteeOrder.guaranteeDuration * 30 * 24 * 60 * 60 * 1000
  const guaranteeServiceOn = new Date().getTime() < endDate
  customerGuaranteeOrder.endDate = endDate
  customerGuaranteeOrder.guaranteeServiceOn = guaranteeServiceOn
  return {
    _id: customerGuaranteeOrder._id,
    productName: customerGuaranteeOrder.productName,
    guaranteeDuration: customerGuaranteeOrder.guaranteeDuration,
    startDate: customerGuaranteeOrder.startDate,
    endDate,
    storeAddress: customerGuaranteeOrder.storeAddress,
    storePhone: customerGuaranteeOrder.storePhone,
    imageUrl: customerGuaranteeOrder.imageUrl,
    guaranteeServiceOn
  }
}

const create = async ({
  userId,
  productName,
  guaranteeDuration,
  startDate,
  storeAddress,
  storePhone,
  imageUrl
}) => {
  const duplicateRecord = await CustomerGuaranteeOrder.findOne({ productName })
  if (!!duplicateRecord) throw new Error("Duplicate product name")

  const newCustomerGuaranteeOrder = new CustomerGuaranteeOrder({
    user: userId,
    productName,
    guaranteeDuration,
    startDate,
    storeAddress,
    storePhone,
    imageUrl,
    createdAt: new Date().getTime()
  })
  await newCustomerGuaranteeOrder.save()
  return newCustomerGuaranteeOrder
}

const update = async ({
  userId,
  _id,
  productName,
  guaranteeDuration,
  startDate,
  storeAddress,
  storePhone,
  imageUrl
}) => {
  const customerGuaranteeOrder = await CustomerGuaranteeOrder.findOne({ _id, user: userId })
  if (!customerGuaranteeOrder)
    throw new Error("CustomerGuaranteeOrder doesn't exist")

  customerGuaranteeOrder.productName = productName
  customerGuaranteeOrder.guaranteeDuration = guaranteeDuration
  customerGuaranteeOrder.startDate = startDate
  customerGuaranteeOrder.storeAddress = storeAddress
  customerGuaranteeOrder.storePhone = storePhone
  customerGuaranteeOrder.imageUrl = imageUrl

  await customerGuaranteeOrder.save()
  return customerGuaranteeOrder
}

const remove = async (_id) => {
  const customerGuaranteeOrder = await CustomerGuaranteeOrder.findOne({ _id })
  if (!customerGuaranteeOrder)
    throw new Error("Customer guarantee order doesn't exist")

  await CustomerGuaranteeOrder.deleteOne({ _id })
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}
