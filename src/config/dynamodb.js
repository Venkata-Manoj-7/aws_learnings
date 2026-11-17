const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const dynamoDB = new DynamoDBClient({});
module.exports = dynamoDB;