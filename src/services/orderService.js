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
        orderId: Number(item.orderId.N),
        product: item.product.S,
        quantity: Number(item.quantity.N)
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
            quantity: { N: String(order.quantity) }
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
            "SET product = :product, quantity = :quantity",
        ExpressionAttributeValues: {
            ":product": { S: order.product.trim() },
            ":quantity": { N: String(order.quantity) }
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