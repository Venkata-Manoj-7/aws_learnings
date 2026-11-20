const {
    PutItemCommand,
    GetItemCommand,
    UpdateItemCommand,
    DeleteItemCommand
} = require("@aws-sdk/client-dynamodb");

const dynamoDB = require("../config/dynamodb");

function formatOrder(item) {
    if (!item) {
        return null;
    }

    return {
        orderId: item.orderId?.N ? Number(item.orderId.N) : null,
        product: item.product?.S ?? null,
        quantity: item.quantity?.N ? Number(item.quantity.N) : null,
        unitPrice: item.unitPrice?.N ? Number(item.unitPrice.N) : null,
        totalPrice: item.totalPrice?.N ? Number(item.totalPrice.N) : null
    };
}

// CREATE ORDER
async function createOrder(order) {

    const command = new PutItemCommand({
        TableName: "Orders",
        ConditionExpression: "attribute_not_exists(orderId)",
        Item: {
            orderId: { N: String(order.orderId) },
            product: { S: order.product.trim() },
            quantity: { N: String(order.quantity) },
            unitPrice: { N: String(order.unitPrice) },
            totalPrice: { N: String(order.totalPrice) }
        }
    });

    await dynamoDB.send(command);
}

// READ ORDER
async function getOrder(orderId) {

    const command = new GetItemCommand({
        TableName: "Orders",
        Key: {
            orderId: { N: String(orderId) }
        }
    });

    const result = await dynamoDB.send(command);

    return formatOrder(result.Item);
}

// UPDATE ORDER
async function updateOrder(orderId, order) {

    const command = new UpdateItemCommand({
        TableName: "Orders",
        Key: {
            orderId: { N: String(orderId) }
        },
        UpdateExpression:
            "SET product = :product, quantity = :quantity, unitPrice = :unitPrice, totalPrice = :totalPrice",
        ExpressionAttributeValues: {
            ":product": { S: order.product.trim() },
            ":quantity": { N: String(order.quantity) },
            ":unitPrice": { N: String(order.unitPrice) },
            ":totalPrice": { N: String(order.totalPrice) }
        },
        ConditionExpression: "attribute_exists(orderId)",
        ReturnValues: "ALL_NEW"
    });

    const result = await dynamoDB.send(command);

    return formatOrder(result.Attributes);
}

// DELETE ORDER
async function deleteOrder(orderId) {

    const command = new DeleteItemCommand({
        TableName: "Orders",
        Key: {
            orderId: { N: String(orderId) }
        },
        ConditionExpression: "attribute_exists(orderId)",
        ReturnValues: "ALL_OLD"
    });

    const result = await dynamoDB.send(command);

    return formatOrder(result.Attributes);
}

module.exports = {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder
};