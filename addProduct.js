// pages/api/getProducts.js
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        let client;

        try {
            // Conectar ao MongoDB
            client = await MongoClient.connect(process.env.MONGODB_URI);
            const db = client.db();
            const collection = db.collection('produtos');

            // Buscar todos os produtos salvos
            const produtos = await collection.find().toArray();

            // Enviar os produtos como resposta
            res.status(200).json({ produtos });
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            res.status(500).json({ message: 'Erro ao buscar os produtos', error });
        } finally {
            if (client) {
                await client.close();
            }
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
