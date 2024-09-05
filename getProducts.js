let produtos = [];

exports.handler = async function(event, context) {
    if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify({ produtos }),
        };
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Método não permitido' }),
        };
    }
};
