//-----------------------------------------------------
// ROUTES FOR POST
// ----------------------------------------------------
import express from "express";
import PostController from "../controllers/post/index";

const router = express.Router();
// JWToken.middleware -> implementer le middleware
// router.get("/search", JWToken.middleware, PostController.search);
router.get("/search", PostController.search);
router.post("/create", PostController.create)
router.put("/update", PostController.update)
router.put("/like", PostController.like)
router.delete("/remove", PostController.remove)

export default router;
