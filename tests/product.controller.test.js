jest.mock('../models/product.model')

const Product = require('../models/product.model')
const { getProduct } = require('../controllers/product.controller')

describe('getProduct', () => {
    let req, res

    beforeEach(() => {
        req = { params: { id: '64b0000000000000000000ff' } }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        jest.clearAllMocks()
    })

    test('returns 404 with message when product does not exist', async () => {
        // This test reproduces the bug: findById returns null (product missing)
        Product.findById = jest.fn().mockResolvedValue(null)

        await getProduct(req, res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ message: 'Product not Found' })
    })

    test('returns 200 with product data when product exists', async () => {
        const mockProduct = { _id: '64b0000000000000000000ff', name: 'Widget', quantity: 10, price: 5.99 }
        Product.findById = jest.fn().mockResolvedValue(mockProduct)

        await getProduct(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(mockProduct)
    })

    test('returns 500 on unexpected database error', async () => {
        Product.findById = jest.fn().mockRejectedValue(new Error('DB failure'))

        await getProduct(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ message: 'DB failure' })
    })
})
