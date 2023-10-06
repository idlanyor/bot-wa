// const config = require('@config');
// const axios = require('axios').default;
// const i18n = require('i18n');



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
            let { data } = await api('lolhuman').get('/api/ytaudio2', { params: { url: args[0] } });
            await msg.replyImage({ url: data.result.thumbnail }, `${data.result.title}`);
            await msg.replyAudio({ url: data.result.link });
            // await msg.replySticker({ url:})
        } catch (error) {
            console.error('Terjadi kesalahan dalam permintaan:', error);
            await msg.reply('Terjadi kesalahan dalam permintaan. Mohon cek URL atau coba lagi nanti.');
        }
    },
};
// if (args.length == 0) return reply(`Example: ${prefix + command} Koceng Imot`)
// query = args.join(" ")
// get_result = await fetchJson(`https://api.lolhuman.xyz/api/stickerwa?apikey=${apikey}&query=${query}`)
// get_result = get_result.result[0].stickers
// for (var x of get_result) {
//     ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/convert/towebp?apikey=${apikey}&img=${x}`)
//     await lolhuman.sendMessage(from, ini_buffer, sticker)
// }
