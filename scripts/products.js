const products = [
    { id: 1, name: "Tire", price: 50, quantityAvailable: 10 },
    { id: 2, name: "Battery", price: 80, quantityAvailable: 5 },
    { id: 3, name: "Brake Pads", price: 30, quantityAvailable: 15 },
    { id: 4, name: "Engine Oil", price: 25, quantityAvailable: 20 },
    { id: 5, name: "Headlights", price: 40, quantityAvailable: 8 },
    { id: 6, name: "Windshield", price: 100, quantityAvailable: 3 },
    { id: 7, name: "Air Filter", price: 15, quantityAvailable: 25 },
    { id: 8, name: "Car Jack", price: 60, quantityAvailable: 7 },
    { id: 9, name: "Fan Belt", price: 20, quantityAvailable: 12 }
];

let selectedProducts = [];

const productList = document.getElementById("productList");

// Display each product with a dropdown to select quantity
products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add('product-item');

    productElement.innerHTML = `
        <input type="checkbox" id="product-${product.id}" data-id="${product.id}">
        <label for="product-${product.id}">
            ${product.name} - $${product.price} (Available: ${product.quantityAvailable})
        </label>
        <select id="quantity-${product.id}" disabled>
            <option value="0">Select Quantity</option>
            ${Array.from({ length: product.quantityAvailable }, (v, i) => i + 1).map(qty => `<option value="${qty}">${qty}</option>`).join('')}
        </select><br>
    `;
    productList.appendChild(productElement);

    // Enable quantity dropdown when the product is selected
    document.getElementById(`product-${product.id}`).addEventListener("change", function () {
        const quantitySelect = document.getElementById(`quantity-${product.id}`);
        if (this.checked) {
            quantitySelect.disabled = false;
        } else {
            quantitySelect.disabled = true;
            quantitySelect.value = "0"; // Reset quantity when unchecked
        }
    });
});

// On checkout, store the selected products and their quantities
document.getElementById("checkoutButton").addEventListener("click", function () {
    selectedProducts = products.filter(product => {
        const checkbox = document.getElementById(`product-${product.id}`);
        const quantitySelect = document.getElementById(`quantity-${product.id}`);
        return checkbox.checked && quantitySelect.value > 0;
    }).map(product => {
        const quantity = parseInt(document.getElementById(`quantity-${product.id}`).value);

        // Reduce stock
        product.quantityAvailable -= quantity;

        return {
            ...product,
            selectedQuantity: quantity,
            totalCost: product.price * quantity
        };
    });

    // Save updated products list with reduced stock to localStorage (for demo purposes)
    localStorage.setItem("products", JSON.stringify(products));

    // Save selected products to localStorage to display on invoice page
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));

    // Redirect to invoice page
    window.location.href = "invoice.html";
});

document.getElementById("cancelButton").addEventListener("click", function () {
    window.location.reload();
});

document.getElementById("exitButton").addEventListener("click", function () {
    window.location.href = "index.html";
});
