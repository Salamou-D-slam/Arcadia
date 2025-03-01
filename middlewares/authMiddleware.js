export const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/connexion");
};

export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.isAuthenticated() || !roles.includes(req.user.role)) {
            return res.status(403).send("Accès interdit");
        }
        next();
    };
};
