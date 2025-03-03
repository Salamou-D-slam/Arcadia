// 🔹 Middleware pour vérifier l'authentification
export function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/connexion"); // Redirige vers la page de connexion si non connecté
}


export const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/connexion");
};
/*
export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.isAuthenticated() || !roles.includes(req.user.role)) {
            return res.status(403).send("Accès interdit");
        }
        next();
    };
};*/

//  Middleware pour vérifier les rôles

export function checkRole(roleId) {
    return (req, res, next) => {
        if (!req.user || req.user.role_id !== roleId) {
            return res.status(403).send("Accès refusé");
        }
        next();
    };
}