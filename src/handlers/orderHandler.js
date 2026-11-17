const {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder
} = require("../services/orderService");

const {
    validateOrder,
    validateOrderFields,
    validateOrderId
} = require("../utils/validation");

const {
    successResponse,
    errorResponse
} = require("../utils/response");

async function parseRequestBody(body) {

    if (typeof body !== "string" || body.trim() === "") {
        return { error: "Request body is required" };
    }

    try {
        return { order: JSON.parse(body) };
    } catch (error) {
        return { error: "Invalid JSON request body" };
    }
}

async function handler(event) {

    const method = event.httpMethod;
    const orderId = event.pathParameters?.orderId;

    try {

        // GET ORDER
        if (method === "GET") {

            if (!validateOrderId(orderId)) {
                return errorResponse(400, "Invalid orderId");
            }

            const order = await getOrder(orderId);

            if (!order) {
                return errorResponse(404, "Order not found");
            }

            return successResponse(200, { order });
        }

        // POST ORDER
        if (method === "POST") {

            const parsed = await parseRequestBody(event.body);

            if (parsed.error) {
                return errorResponse(400, parsed.error);
            }

            const order = parsed.order;
            const validationError = validateOrder(order);

            if (validationError) {
                return errorResponse(400, validationError);
            }

            await createOrder(order);

            return successResponse(201, {
                orderId: order.orderId,
                product: order.product.trim(),
                message: "Order created successfully"
            });
        }

        // UPDATE ORDER
        if (method === "PUT") {

            if (!validateOrderId(orderId)) {
                return errorResponse(400, "Invalid orderId");
            }

            const parsed = await parseRequestBody(event.body);

            if (parsed.error) {
                return errorResponse(400, parsed.error);
            }

            const order = parsed.order;
            const validationError = validateOrderFields(order);

            if (validationError) {
                return errorResponse(400, validationError);
            }

            const updatedOrder = await updateOrder(orderId, order);

            return successResponse(200, {
                message: "Order updated successfully",
                order: updatedOrder
            });
        }

        // DELETE ORDER
        if (method === "DELETE") {

            if (!validateOrderId(orderId)) {
                return errorResponse(400, "Invalid orderId");
            }

            const deletedOrder = await deleteOrder(orderId);

            return successResponse(200, {
                message: "Order deleted successfully",
                order: deletedOrder
            });
        }

        // UNSUPPORTED METHOD
        return errorResponse(405, "Method not allowed");

    }  catch (error) {

    if (error.name === "ConditionalCheckFailedException") {

        if (method === "POST") {
            return errorResponse(409, "Order already exists");
        }

        return errorResponse(
            404,
            `Order ${orderId} not found`
        );
    }

    console.error("Order API error:", error);

    return errorResponse(500, "Internal server error");
}
}

module.exports = { handler };