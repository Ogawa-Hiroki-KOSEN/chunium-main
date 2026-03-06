module.exports = async function (fastify, opts) {
    // 中身を空にしていたsongLibraryのモックデータ（互換性維持のため）
    const mockLibrary = [
        { id: 'astral', title: 'Astral Hyperion', constant: 13.4 },
        { id: 'mirage', title: 'Mirage of Mind', constant: 13.7 },
    ];

    // GET /songs 
    fastify.get('/', async (request, reply) => {
        return {
            message: '楽曲一覧を取得しました（モックデータ）',
            data: mockLibrary,
        };
    });

    // GET /songs/:id (Dynamic Routingのデモ)
    fastify.get('/:id', async (request, reply) => {
        const { id } = request.params;
        const song = mockLibrary.find((s) => s.id === id);

        if (!song) {
            reply.code(404);
            return { error: 'Not Found', message: `ID: ${id} の楽曲が見つかりません。` };
        }

        return { data: song };
    });
};