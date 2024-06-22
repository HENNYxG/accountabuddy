const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));
app.unsubscribe('/', router);




app.post("/newuser", async (req, res) => {
  console.log("new user route hit");
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
  } catch (error) {
    console.error("Error creating new user:", error);
  }
  res.sendStatus(200);
});



const port = 4000
const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
