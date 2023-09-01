const api = require('@libs/utils/api')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    aliases: ['yta', 'ytaudio'],
    category: 'youtube',
    description: 'Youtube audio downloader.',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://www.youtube.com/watch?v=eZskFo64rs8',
    callback: async ({ msg, args }) => {
        try {
            let { data } = await api('lolhuman').get('/api/ytaudio', { params: { url: args[0] } });
            await msg.replyImage({ url: data.result.thumbnail }, `${data.result.title} - ${data.result.link.size}`);
            await msg.replyAudio({ url: data.result.link.link });
        } catch (error) {
            console.error('Terjadi kesalahan dalam permintaan:', error);
            await msg.reply('Terjadi kesalahan dalam permintaan. Mohon cek URL atau coba lagi nanti.');
        }
    },
}
