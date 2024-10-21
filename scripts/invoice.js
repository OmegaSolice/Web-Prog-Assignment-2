const selectedProducts = JSON.parse(localStorage.getItem("selectedProducts"));
const taxRate = 0.1; // 10% tax

let subtotal = 0;
let tax = 0;
let total = 0;

selectedProducts.forEach(product => {
    subtotal += product.totalCost;
});

tax = subtotal * taxRate;
total = subtotal + tax;

const invoiceDetails = document.getElementById("invoiceDetails");

invoiceDetails.innerHTML = `
    <h3>Products Purchased:</h3>
    <ul>
        ${selectedProducts.map(product => `
            <li>
                ${product.name} - $${product.price} x ${product.selectedQuantity} 
                (Total: $${product.totalCost.toFixed(2)})
            </li>
        `).join('')}
    </ul>
    <hr>
    <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
    <p><strong>Tax (10%):</strong> $${tax.toFixed(2)}</p>
    <p><strong>Total:</strong> $${total.toFixed(2)}</p>
`;

document.getElementById("exitButton").addEventListener("click", function () {
    window.location.href = "products.html";
});
