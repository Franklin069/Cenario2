//importações necessárias para o projeto
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

//configurações para o servidor
app.use(bodyParser.json());
app.use(cors());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  if (users.length > 0) return res.status(200).send(users);
  return res.status(404).send("No users found");
});

app.post("/user", async (req, res) => {
  const data = req.body;
  await prisma.user.create({
    data: {
      name: data.name,
    },
  });
  return res.sendStatus(201);
});

app.get("/user/:name", async (req, res) => {
  const name = req.params.name;
  const user = await prisma.user.findMany({
    where: {
      name: name,
    },
  });
  if (user.length > 0) return res.status(200).send(user);
  return res.status(404).send("No user found");
});

// Inicie o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});

//arquivo responsavel por renderizar elementos