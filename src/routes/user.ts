//-----------------------------------------------------
// ROUTES FOR USER
// FOR NOW, ONLY USED JWTTOKEN MIDDLEWARE FOR UPDATE PASSWORD
// ----------------------------------------------------
import express from "express";
import UserController from "../controllers/user/index";
import JWToken from "../libs/JWToken";

const router = express.Router();

router.post("/register", UserController.register);
router.put('/update', JWToken.middleware , UserController.update)
router.delete('/remove', UserController.remove)
router.get('/search', UserController.search)
router.post("/login", UserController.login);

export default router;
