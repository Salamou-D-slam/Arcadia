document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 🔹 Récupérer les infos de l'utilisateur via l'API
        const response = await fetch('/avisDelete');
        const user = await response.json();

        console.log("Utilisateur récupéré :", user); // Debug

        if (user && (user.role_name === 'administrateur' || user.role_name === 'employé')) {
            // 🔹 Afficher les formulaires et boutons si admin ou employé
            document.querySelectorAll('.admin-btn').forEach(element => element.style.display = 'block');
        } else {
            // 🔹 Cacher ces éléments pour les autres utilisateurs
            document.querySelectorAll('.admin-btn').forEach(element => element.style.display = 'none');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l’utilisateur :', error);
    }
});
