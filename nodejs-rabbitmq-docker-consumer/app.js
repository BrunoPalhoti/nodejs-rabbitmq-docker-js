const amqp = require("amqplib");

async function consumeMessages() {
  try {
    const connection = await amqp.connect("amqp://localhost:5673");
    const channel = await connection.createChannel();

    await channel.assertExchange("logExchange", "direct");

    const q = await channel.assertQueue("InfoQueue");

    await channel.bindQueue(q.queue, "logExchange", "Info");

    channel.consume(q.queue, (msg) => {
      const data = JSON.parse(msg.content);
      console.log(data);
      channel.ack(msg);
    });

  } catch (error) {
    console.log(error)
  }
}

consumeMessages();