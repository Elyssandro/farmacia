export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nomeProduto, precoProduto } = req.body;
      
        res.status(200).json({ message: 'Produto adicionado com sucesso!' });
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
