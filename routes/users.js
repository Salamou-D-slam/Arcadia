import express from "express";
import { getAllUsers } from "../models/userModel.js";
import { checkAuthenticated, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users", checkRole(["admin"]), async (req, res) => {
    try {
        const result = await getAllUsers();
        res.render("users", { users: result.rows });
    } catch (err) {
        res.status(500).send("Erreur serveur");
    }
});

export default router;
