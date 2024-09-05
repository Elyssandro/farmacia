const { MongoClient } = require('mongodb');

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        const { nomeProduto, precoProduto } = JSON.parse(event.body);

        if (!nomeProduto || !precoProduto) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Nome do produto e preço são obrigatórios' }),
            };
        }

        let client;

        try {
            // Conectar ao MongoDB
            client = await MongoClient.connect(process.env.MONGODB_URI);
            const db = client.db();
            const collection = db.collection('produtos');

            // Inserir os dados no banco de dados
            const result = await collection.insertOne({ nome: nomeProduto, preco: precoProduto });

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Produto adicionado com sucesso!', result }),
            };
        } catch (error) {
            console.error('Erro ao conectar ao MongoDB ou inserir dados:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Erro ao adicionar o produto', error }),
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
