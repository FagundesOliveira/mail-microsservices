const express = require("express");
const routes = express.Router();
const userController = require("../../controller/user/userController");
const amqpController = require("../../controller/amqp/amqpController");

routes.get("/", (req, res) => {
  return res.json({ name: "MAIL-MICROSSERVICES" });
});

routes.post("/test", (req, res) => {

  const { name, email, phone } = req.body; 

  const user = {
    "name": name,
    "email": email,
    "phone": phone
  }

  amqpController.sendUserData(user);

  res.send(200);
});

routes.use(userController);

module.exports = routes;
