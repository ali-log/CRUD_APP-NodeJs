/**
 * Tests for product controller.
 * Uses manual mocks for mongoose so no real DB connection is needed.
 */
jest.mock('../models/product.model');

const Product = require('../models/product.model');
const { getProducts } = require('../controllers/product.controller');

function buildRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('getProducts', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns an array of all products', async () => {
    const fakeProducts = [
      { _id: '1', name: 'Widget', quantity: 10, price: 5 },
      { _id: '2', name: 'Gadget', quantity: 3, price: 20 },
    ];
    Product.find.mockResolvedValue(fakeProducts);

    const req = {};
    const res = buildRes();

    await getProducts(req, res);

    expect(Product.find).toHaveBeenCalledWith({});
    expect(res.status).toHaveBeenCalledWith(200);
    const payload = res.json.mock.calls[0][0];
    expect(Array.isArray(payload)).toBe(true);
    expect(payload).toHaveLength(2);
  });

  it('responds with 500 on database error', async () => {
    Product.find.mockRejectedValue(new Error('DB failure'));

    const req = {};
    const res = buildRes();

    await getProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'DB failure' });
  });
});
