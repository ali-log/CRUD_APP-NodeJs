jest.mock('../models/product.model')
const Product = require('../models/product.model')
const { createProduct } = require('../controllers/product.controller')

describe('createProduct', () => {
  let req, res

  beforeEach(() => {
    req = { body: { name: 'Widget', price: 9.99, quantity: 5 } }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    jest.clearAllMocks()
  })

  it('returns 201 Created with the new product on success', async () => {
    const mockProduct = { _id: 'abc123', name: 'Widget', price: 9.99, quantity: 5 }
    Product.create.mockResolvedValue(mockProduct)

    await createProduct(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(mockProduct)
  })

  it('returns 500 when Product.create throws', async () => {
    Product.create.mockRejectedValue(new Error('DB error'))

    await createProduct(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'DB error' })
  })
})
