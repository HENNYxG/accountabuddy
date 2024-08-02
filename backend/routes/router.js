const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/newuser", async (req, res) => {
  console.log("new user route hit from router");
  const { data } = req.body;
  console.log(data);
  try {
    await prisma.user.create({
      data: {
        clerkId: data.clerkId,
        email: data.email,
        name: data.name,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("clerkId")) {
      console.log("User already exists. Skipping creation.");
      res.sendStatus(200);
    } else {
      console.error("Error creating new user:", error);
      res.sendStatus(500);
    }
  }
});

module.exports = router;
