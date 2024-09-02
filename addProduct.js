import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nomeProduto, precoProduto } = req.body;

        // Conectar ao MongoDB usando a variável de ambiente
        const client = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = client.db();
        const collection = db.collection('produtos');

        // Inserir os dados no banco de dados
        const result = await collection.insertOne({ nome: nomeProduto, preco: precoProduto });

        // Fechar a conexão
        client.close();

        // Responder ao frontend
        res.status(200).json({ message: 'Produto adicionado com sucesso!', result });
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
