document.addEventListener('DOMContentLoaded', () => {
    const authButton = document.getElementById('connexion-button');

    // Vérifie l'état d'authentification en appelant l'API
    fetch('/api/auth/status')
        .then(response => response.json())
        .then(data => {
            if (data.isAuthenticated) {
                // Si l'utilisateur est connecté, changez le texte et le comportement du bouton
                authButton.textContent = 'Mon Espace';
                authButton.onclick = () => {
                    // Utilisation du switch pour rediriger en fonction du rôle
                switch (data.role_name) {
                    case 'administrateur':
                        window.location.href = '/admin'; // Redirige vers la page admin
                        break;
                    case 'employé':
                        window.location.href = '/employe'; // Redirige vers la page employé
                        break;
                    case 'vétérinaire':
                        window.location.href = '/veterinaire'; // Redirige vers la page vétérinaire
                        break;
                    default:
                        // Si le rôle n'est pas reconnu, rediriger vers une page par défaut ou une erreur
                        window.location.href = '/'; // Exemple de page par défaut
                        break;
                }
            
                
                };
            } else {
                // Si l'utilisateur n'est pas connecté, garder le bouton de connexion
                authButton.textContent = 'Connexion';
                authButton.onclick = () => {
                    // Rediriger vers la page de connexion
                    window.location.href = '/connexion';
                };
            }
        })
        .catch(err => {
            console.error('Erreur lors de la vérification de l\'authentification:', err);
            authButton.textContent = 'Erreur';
        });
});



