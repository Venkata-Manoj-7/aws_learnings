
const {
    DeleteItemCommand
} = require("@aws-sdk/client-dynamodb");

jest.mock("../src/config/dynamodb", () => ({
    send: jest.fn()
}));

const dynamoDB = require("../src/config/dynamodb");
const { deleteOrder } = require("../src/services/orderService");

describe("deleteOrder", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should format deleted order when price attributes are missing", async () => {

        dynamoDB.send.mockResolvedValue({
            Attributes: {
                orderId: { N: "101" },
                product: { S: "Laptop" },
                quantity: { N: "2" }
            }
        });

        const result = await deleteOrder("101");

        expect(result).toEqual({
            orderId: 101,
            product: "Laptop",
            quantity: 2,
            unitPrice: null,
            totalPrice: null
        });

        expect(dynamoDB.send).toHaveBeenCalledWith(
            expect.any(DeleteItemCommand)
        );
    });
});
