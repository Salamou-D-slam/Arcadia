async function getUserProfile() {
    const email = localStorage.getItem("userEmail");


    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });

    const data = await response.json();
    if (response.ok) {
        document.getElementById("username").textContent = data.username;
    } else {
        alert("Impossible de récupérer le profil !");
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("userEmail");
    window.location.href = "login.html";
}

getUserProfile();
