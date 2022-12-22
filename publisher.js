/* RabbitMQ */
const amqp = require("amqplib");

const msg = { number: process.argv[2] };
connect();
async function connect() {
  try {
    const amqpServer = "amqp://user:password@localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    await channel.assertExchange("delayed_direct", "x-delayed-message", {
      autoDelete: false,
      durable: true,
      passive: true,
      arguments: {
        "x-delayed-type": "direct",
      },
    });
    await channel.bindQueue("jobs", "delayed_direct", "jobs");

    channel.publish(
      "delayed_direct",
      "jobs",
      Buffer.from(JSON.stringify(msg)),
      {
        headers: {
          "x-delay": 5000,
        },
      }
    );
    console.log(`Job sent successfully ${msg.number}`);
    await channel.close();
    await connection.close();
  } catch (ex) {
    console.error(ex);
  }
}
