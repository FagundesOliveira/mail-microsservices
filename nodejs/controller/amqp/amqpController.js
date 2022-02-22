const amqp = require("amqplib");


exports.sendToQueue = async (queueName, message) => {
  let connection;
  try {
    connection = await amqp.connect("amqp://rabbitmq:5672");
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, {
      durable: false,
    });

    channel.sendToQueue(queueName, Buffer.from(message));
    console.log("Message sended to queue " + queueName + ": " + message);

    await channel.close();

  } catch (err) {
      console.log('Something went wrong! ' + err);
  } finally {
      if(connection) connection.close();
  }
};

exports.sendUserData = async (message) => {
	exports.sendToQueue('send-to-queue-persist-user', JSON.stringify(message));
}