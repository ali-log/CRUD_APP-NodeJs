const request = require("supertest");
const app = require("../app");

jest.mock("../models/product.model");
const Product = require("../models/product.model");

const NONEXISTENT_ID = "64b0000000000000000000ff";
const EXISTING_PRODUCT = { _id: NONEXISTENT_ID, name: "Widget", quantity: 5, price: 9.99 };

afterEach(() => {
  jest.clearAllMocks();
});

describe("GET /api/products/:id", () => {
  it("returns 404 with message when product does not exist", async () => {
    Product.findById = jest.fn().mockResolvedValue(null);

    const res = await request(app).get(`/api/products/${NONEXISTENT_ID}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: "Product not Found" });
  });

  it("returns 200 with product when product exists", async () => {
    Product.findById = jest.fn().mockResolvedValue(EXISTING_PRODUCT);

    const res = await request(app).get(`/api/products/${NONEXISTENT_ID}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ name: "Widget" });
  });
});
