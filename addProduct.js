import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nomeProduto, precoProduto } = req.body;

        if (!nomeProduto || !precoProduto) {
            return res.status(400).json({ message: 'Nome do produto e preço são obrigatórios' });
        }

        let client;

        try {
            // Conectar ao MongoDB
            client = await MongoClient.connect(process.env.MONGODB_URI);
            const db = client.db();
            const collection = db.collection('produtos');

            // Inserir os dados no banco de dados
            const result = await collection.insertOne({ nome: nomeProduto, preco: precoProduto });

            // Responder ao frontend
            res.status(200).json({ message: 'Produto adicionado com sucesso!', result });
        } catch (error) {
            console.error('Erro ao conectar ao MongoDB ou inserir dados:', error);
            res.status(500).json({ message: 'Erro ao adicionar o produto', error });
        } finally {
            if (client) {
                await client.close();
            }
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
