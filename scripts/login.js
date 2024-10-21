const storedUsername = "admin";
const storedPassword = "password123";  // Minimum of 8 characters

let loginAttempts = 0;

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === storedUsername && password === storedPassword) {
        window.location.href = "products.html";
    } else {
        loginAttempts++;
        document.getElementById("errorMessage").textContent = "Incorrect username or password.";
        if (loginAttempts >= 3) {
            window.location.href = "error.html";  // Redirect after 3 failed attempts
        }
    }
});
