function successResponse(statusCode, data) {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: "success",
            ...data
        })
    };
}

function errorResponse(statusCode, message) {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: "error",
            message
        })
    };
}

module.exports = {
    successResponse,
    errorResponse
};