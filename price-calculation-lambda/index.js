const products = {
    Laptop: 50000,
    Mouse: 500,
    Keyboard: 1000,
    Monitor: 12000
};

exports.handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));

    const { product, quantity } = event;

    const unitPrice = products[product];

    if (!unitPrice) {
        throw new Error("Product not found");
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error("Invalid quantity");
    }

    const totalPrice = unitPrice * quantity;

    return {
        product,
        quantity,
        unitPrice,
        totalPrice
    };
};
