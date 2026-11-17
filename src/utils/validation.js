
function validateOrder(order) {

    // Check whether the request is a valid object
    if (
        !order ||
        typeof order !== "object" ||
        Array.isArray(order)
    ) {
        return "Invalid order";
    }

    // Validate orderId
    if (
        typeof order.orderId !== "number" ||
        !Number.isSafeInteger(order.orderId) ||
        order.orderId <= 0
    ) {
        return "Invalid orderId";
    }

    // Validate product and quantity
    return validateOrderFields(order);
}

function validateOrderFields(order) {

    // Check whether the request is a valid object
    if (
        !order ||
        typeof order !== "object" ||
        Array.isArray(order)
    ) {
        return "Invalid order";
    }

    // Validate product
    if (
        typeof order.product !== "string" ||
        order.product.trim() === ""
    ) {
        return "Invalid product";
    }

    // Validate quantity
    if (
        typeof order.quantity !== "number" ||
        !Number.isSafeInteger(order.quantity) ||
        order.quantity <= 0
    ) {
        return "Invalid quantity";
    }

    return null;
}

function validateOrderId(orderId) {

    if (
        typeof orderId !== "string" ||
        !/^[1-9]\d*$/.test(orderId) ||
        !Number.isSafeInteger(Number(orderId))
    ) {
        return false;
    }

    return true;
}

module.exports = {
    validateOrder,
    validateOrderFields,
    validateOrderId
};
