const api = require('@libs/utils/api')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ['play2', 'ytplayer'],
  category: 'youtube',
  description: 'Youtube audio player.',
  waitMessage: true,
  minArgs: 1,
  expectedArgs: '<query>',
  example: '{prefix}{command} halu feby putri',
  callback: async ({ msg, fullArgs }) => {
    try {
      let { data } = await api('lolhuman').get('/api/ytplay2', { params: { query: fullArgs } });
      await msg.replyImage({ url: data.result.thumbnail }, `*[YOUTUBE PLAYER]* \nJudul : ${data.result.title}\n\n_bentar yaa,audionya lagi dikirim nih_ 👌`);
      await msg.replyAudio({ url: data.result.audio });
    } catch (error) {
      console.error('Terjadi kesalahan dalam permintaan:', error);
      await msg.reply('Terjadi kesalahan dalam permintaan. Mohon cek URL atau coba lagi nanti.');
    }
  },
}
