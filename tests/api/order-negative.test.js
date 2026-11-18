const API_URL = "https://0vmgnnxks6.execute-api.eu-north-1.amazonaws.com/dev";
// Order does not exist
test("Get a non-existing order should return 404", async () => {
    const response = await fetch(`${API_URL}/orders/999999`, {
        method: "GET"
    });

    const responseData = await response.json();
    expect(response.status).toBe(404);
    expect(responseData.status).toBe("error");
});
// Invalid order ID
test("Get an order with invalid ID should return 400", async () => {
    const response = await fetch(`${API_URL}/orders/abc`, {
        method: "GET"
    });
    const responseData = await response.json();
    expect(response.status).toBe(400);
    expect(responseData.status).toBe("error");
});
// Invalid order body
test("Create an order with invalid product should return 400", async () => {
    const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            orderId: 105,
            product: "",
            quantity: 2
        })
    });

    const responseData = await response.json();
    expect(response.status).toBe(400);
    expect(responseData.status).toBe("error");
});
test("Create an order with invalid quantity should return 400", async () => {
    const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            orderId: 205,
            product: "Laptop",
            quantity: 0
        })
    });

    const responseData = await response.json();

    expect(response.status).toBe(400);
    expect(responseData.status).toBe("error");
});

test("Creating an order with duplicate ID should return 409", async () => {
    const order = {
        orderId: 203,
        product: "Laptop",
        quantity: 2
    };
    // First request: create the order
    const firstResponse = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });
    expect(firstResponse.status).toBe(201);
    // Second request: try creating the same order again
    const secondResponse = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });
    const responseData = await secondResponse.json();
    expect(secondResponse.status).toBe(409);
    expect(responseData.status).toBe("error");
    // Cleanup: delete the order created by the first request
    await fetch(`${API_URL}/orders/203`, {
        method: "DELETE"
    });
});
test("Update an order with invalid product should return 400", async () => {
    const response = await fetch(`${API_URL}/orders/200`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            product: "",
            quantity: 2
        })
    });

    const responseData = await response.json();
    expect(response.status).toBe(400);
    expect(responseData.status).toBe("error");
});
test("Update a non-existing order should return 404", async () => {
      const response = await fetch(`${API_URL}/orders/999998`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            product: "Mouse",
            quantity: 3
        })
    });

    const responseData = await response.json();
    expect(response.status).toBe(404);
    expect(responseData.status).toBe("error");
});
test("Delete a non-existing order should return 404", async () => {
      const response = await fetch(`${API_URL}/orders/999997`, {
        method: "DELETE"
    });

    const responseData = await response.json();
    expect(response.status).toBe(404);
    expect(responseData.status).toBe("error");
});