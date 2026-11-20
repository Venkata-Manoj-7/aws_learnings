const { handler } = require("../../price-calculation-lambda");
describe("PriceCalculationLambda", () => {

    test("should calculate total price for multiple quantities", async () => {
        const event = {
            product: "Laptop",
            quantity: 2
        };

        const result = await handler(event);

        expect(result.totalPrice).toBe(100000);
        expect(result.unitPrice).toBe(50000);
    });

    test("should reject unsupported products", async () => {
        await expect(
            handler({ product: "Mobile", quantity: 1 })
        ).rejects.toThrow("Product not found");
    });

    test("should reject invalid quantity", async () => {
        await expect(
            handler({ product: "Laptop", quantity: 0 })
        ).rejects.toThrow("Invalid quantity");
    });
});
