module.exports = async function (fastify, opts) {
    // GET / 端点
    // サーバーの動作確認用のサンプルページです。
    fastify.get('/', async (request, reply) => {
        return {
            system: 'CHUNIUM API',
            status: 'online',
            message: 'Fastifyベースのメインフレームが正常に起動しています。',
        };
    });
};