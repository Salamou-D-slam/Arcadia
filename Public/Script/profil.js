document.addEventListener('DOMContentLoaded', () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
    });
    const data = await response.json();
            if (response.ok) {
                document.getElementById("username").textContent = data.username;
            } else {
                alert("Utilisateur non trouvé !");
            }
        });