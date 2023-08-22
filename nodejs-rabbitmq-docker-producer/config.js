const rabbitMQ = {
  url: "amqp://localhost",
  port: '5673',
  username:'guest',
  password:'guest',
  vhost: '/',
  autMechanism: ['PLAIN', 'AMQPLAIN', 'EXTRNAL'],
  exchangeName : 'logExchange'
}
module.exports = rabbitMQ