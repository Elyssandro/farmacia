let produtos = [];

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        const { nomeProduto, precoProduto } = JSON.parse(event.body);

        if (!nomeProduto || !precoProduto) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Nome do produto e preço são obrigatórios' }),
            };
        }

        const novoProduto = { nome: nomeProduto, preco: parseFloat(precoProduto) };
        produtos.push(novoProduto);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Produto adicionado com sucesso!', produto: novoProduto }),
        };
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Método não permitido' }),
        };
    }
};
