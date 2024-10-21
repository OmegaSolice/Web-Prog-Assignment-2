const storedUsername = "admin";
const storedPassword = "password123";  // Minimum of 8 characters

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === storedUsername && password === storedPassword) {
        window.location.href = "products.html";
    } else {
        document.getElementById("errorMessage").textContent = "Incorrect username or password.";
    }
});
