var amqplib = require("amqplib");
const userService = require('./service/userService');

const queueSendUsersEmail = "send-to-queue-mail-users";
const queueUserPersist = "send-to-queue-persist-user"; 

amqplib
  .connect("amqp://rabbitmq:5672")
  .then((conn) => {
    var ok = conn.createChannel();
    ok = ok.then((ch) => {
      console.log(
        "Beginning processment for queue send-to-queue-persist-user"
      );
      ch.assertQueue(queueUserPersist, {
        durable: false,
      });
      ch.consume(
        queueUserPersist,
        function (msg) {
          if (msg !== null) {
            try {
              console.log("User data received: " + msg.content.toString());
              userService.persistUser(JSON.parse(msg.content));
              ch.ack(msg);
            } catch (err) {
              console.log(
                "Error with the message from the queue send-to-queue-persist-user: " +
                  err
              );
            }
          }
        },
        {
          noAck: false,
        }
      );

      return ch;
    });
    return ok;
  })
  .then(null, console.warn);
