import express from "express";

const router = express.Router();

router.get("/api/v1", (req, res) => {
  res.status(200).json({ message: "Service healthy" });
});

export default router;
