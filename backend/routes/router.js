const express = require('express');
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// import prisma from '../db/prisma';


router.post('/newuser', async (req, res) => {
    console.log("new user route hit");
    const { data } = req.body;
    try {
        await prisma.user.create({
            data: {
                clerkId: data.id,
                email: data.emailAddresses[0],
                name: data.username,
            }
        })
    } catch (error) {
        console.error("Error creating new user:", error);
    }
    res.sendStatus(200);
});
    

router.post('/create-user', async (req, res) => {
    const { clerkId, email } = req.body;
    console.log("post recieved");

  try {
    const match = await prisma.user.findUnique({
      where: { clerkId },
    });

      if (!match) {
        console.log("trying to create new user");
      const newUser = await prisma.user.create({
        data: {
          clerkId,
          email,
        },
      });
      return res.status(201).json(newUser);
    }

    res.status(200).json(match);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;