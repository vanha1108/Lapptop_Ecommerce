const { customerGuaranteeOrderService } = require("../services")

const get = async (req, res) => {
  try {
    const { userId } = req
    const { search } = req.query
    const data = await customerGuaranteeOrderService.get({ userId, search })
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

const getById = async (req, res) => {
  try {
    const { _id } = req.params
    const data = await customerGuaranteeOrderService.getById(_id)
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

const create = async (req, res) => {
  try {
    const { userId } = req
    const {
      productName,
      guaranteeDuration,
      startDate,
      storeAddress,
      storePhone,
      imageUrl,
    } = req.body
    const data = await customerGuaranteeOrderService.create({
      userId,
      productName,
      guaranteeDuration,
      startDate,
      storeAddress,
      storePhone,
      imageUrl,
    })
    res.status(201).json(data)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

const update = async (req, res) => {
  try {
    const { userId } = req
    const { _id } = req.params
    const {
      productName,
      guaranteeDuration,
      startDate,
      storeAddress,
      storePhone,
      imageUrl,
    } = req.body
    const data = await customerGuaranteeOrderService.update({
      userId,
      _id,
      productName,
      guaranteeDuration,
      startDate,
      storeAddress,
      storePhone,
      imageUrl,
    })
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

const remove = async (req, res) => {
  try {
    const { _id } = req.params
    await customerGuaranteeOrderService.remove(_id)
    res.sendStatus(200)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}
