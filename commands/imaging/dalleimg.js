const api = require('@libs/utils/api')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ['tti', 'dalle'],
  category: 'AI Image',
  description: 'Text To Image.',
  waitMessage: true,
  minArgs: 1,
  expectedArgs: '<text/prompt>',
  example: '{prefix}{command} tahu bulat',
  callback: async ({ msg, fullArgs }) => {
    try {
      let { data } = await api('lolhuman').get('/api/dall-e', { params: { text: fullArgs } });
      await msg.replyImage()
    } catch (error) {
      console.error('Terjadi kesalahan dalam permintaan:', error);
      await msg.reply('Terjadi kesalahan dalam permintaan. Mohon cek URL atau coba lagi nanti.');
    }
  },
}
