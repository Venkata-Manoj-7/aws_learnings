const API_URL = "https://0vmgnnxks6.execute-api.eu-north-1.amazonaws.com/dev";
test("Complete order CRUD lifecycle", async () => {
    const orderId = 202;
    // 1. CREATE
    const createResponse = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            orderId,
            product: "Laptop",
            quantity: 2
        })
    });

    const createdOrder = await createResponse.json();
    expect(createResponse.status).toBe(201);
    expect(createdOrder.orderId).toBe(orderId);
    // 2. READ
    const getResponse = await fetch(`${API_URL}/orders/${orderId}`);
    const fetchedOrder = await getResponse.json();
    expect(getResponse.status).toBe(200);
    expect(fetchedOrder.order.product).toBe("Laptop");
    expect(fetchedOrder.order.quantity).toBe(2);
    // 3. UPDATE
    const updateResponse = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            product: "Mouse",
            quantity: 3
        })
    });

    const updatedOrder = await updateResponse.json();
    expect(updateResponse.status).toBe(200);
    expect(updatedOrder.order.product).toBe("Mouse");
    expect(updatedOrder.order.quantity).toBe(3);
    // 4. VERIFY UPDATED ORDER
    const verifyResponse = await fetch(`${API_URL}/orders/${orderId}`);
    const verifiedOrder = await verifyResponse.json();
    expect(verifyResponse.status).toBe(200);
    expect(verifiedOrder.order.product).toBe("Mouse");
    expect(verifiedOrder.order.quantity).toBe(3);
    // 5. DELETE
    const deleteResponse = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "DELETE"
    });
    const deletedOrder = await deleteResponse.json();
    expect(deleteResponse.status).toBe(200);
    expect(deletedOrder.order.orderId).toBe(orderId);
    // 6. VERIFY DELETION
    const finalResponse = await fetch(`${API_URL}/orders/${orderId}`);
    expect(finalResponse.status).toBe(404);

});
