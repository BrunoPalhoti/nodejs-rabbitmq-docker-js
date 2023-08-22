const amqp = require('amqplib');
const rabbitMQ = require('./config');

console.log(rabbitMQ.url)
class Producer {
    channel;

    // criando o canal
    async createChannel() {
        try {
            
            //criando a conexão
            const connection = await amqp.connect(rabbitMQ);
            console.log('-> connection criada <-');
            
             this.channel = await connection.createChannel();
        } catch (error) {
            console.error('createChannel Error -> ', error);
        }
    }

    async publishMessage(routingKey, message){
       try {
         //verificando se o canal já exite(granti que só seja trabalhado com apenas um canal)
         if(!this.channel){
            // criando o canla
            await this.createChannel();
        }

        // criando o exchange
        const exchangeName = rabbitMQ.exchangeName
        await this.channel.assertExchange(exchangeName, 'direct')

        
        const logDetails = {
            logType: routingKey,
            message: message,
            dateTime: new Date(),
        };

        // mandando a mensagem pro exchagem(que é ande manda pra fila correspondente)
        await this.channel.publish(
            exchangeName, 
            routingKey,
            Buffer.from(JSON.stringify(logDetails)));

        console.log(`The new ${routingKey} log is sent to exchange ${exchangeName}`)
       } catch (error) {
        console.error('publishMessage Error -> ', error);
       }
    }
}


module.exports = Producer