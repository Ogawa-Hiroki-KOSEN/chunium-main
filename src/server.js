const Fastify = require('fastify');
const cors = require('@fastify/cors');
const autoload = require('@fastify/autoload');
const path = require('node:path');

const fastify = Fastify({ logger: true });

// 1. CORSの統合: CHUNITHM-NET連携用などに外部からのアクセスを許可
fastify.register(cors, {
    origin: '*', // TODO: 本番環境では特定のオリジンに絞る
});

// 2. 自動ルーティングの統合: 'routes' フォルダ内のファイルを探索し、自動でルートとして登録
// これにより、手動でのハードコーディング (fastify.get(...) など) が完全に排除されます。
fastify.register(autoload, {
    dir: path.join(__dirname, 'routes'),
});

const start = async () => {
    try {
        const port = process.env.PORT || 3000;
        await fastify.listen({ port, host: '0.0.0.0' });
        fastify.log.info(`サーバーが起動しました: http://localhost:${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
