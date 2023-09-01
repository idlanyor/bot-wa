const api = require('@libs/utils/api')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ['play', 'ytplayer'],
  category: 'youtube',
  description: 'Youtube audio player.',
  waitMessage: true,
  minArgs: 1,
  expectedArgs: '<link>',
  example: '{prefix}{command} https://www.youtube.com/watch?v=eZskFo64rs8',
  callback: async ({ msg, fullArgs }) => {
    try {
      let { data } = await api('lolhuman').get('/api/ytplay', { params: { query: fullArgs } });
      await msg.replyImage({ url: data.result.thumbnail }, `*[YOUTUBE PLAYER]* \nJudul : ${data.result.title} \nDurasi : ${data.result.duration}\nArtis/Upload By : ${data.result.uploader}\n\n_sabar yaa,audionya lagi dikirim nih_ 👌`);
      await msg.replyAudio({ url: data.result.audio.link });
    } catch (error) {
      console.error('Terjadi kesalahan dalam permintaan:', error);
      await msg.reply('Terjadi kesalahan dalam permintaan. Mohon cek URL atau coba lagi nanti.');
    }
  },
}
