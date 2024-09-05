const { MongoClient } = require('mongodb');

exports.handler = async function(event, context) {
    if (event.httpMethod === 'GET') {
        let client;

        try {
            // Conectar ao MongoDB
            client = await MongoClient.connect(process.env.MONGODB_URI);
            const db = client.db();
            const collection = db.collection('produtos');

            // Buscar todos os produtos salvos
            const produtos = await collection.find().toArray();

            return {
                statusCode: 200,
                body: JSON.stringify({ produtos }),
            };
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Erro ao buscar os produtos', error }),
            };
        } finally {
            if (client) {
                await client.close();
            }
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Método não permitido' }),
        };
    }
};
