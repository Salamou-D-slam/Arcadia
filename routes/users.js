import express from "express";
import { getAllUsers } from "../models/userModel.js";
import { checkAuthenticated, checkRole, isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users", checkRole(1), async (req, res) => {
    try {
        const result = await getAllUsers();
        res.render("users", { users: result.rows });
    } catch (err) {
        res.status(500).send("Erreur serveur");
    }
});

export default router;
