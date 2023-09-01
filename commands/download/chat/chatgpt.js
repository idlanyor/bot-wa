const api = require('@libs/utils/api')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ['gpt', 'chatgpt'],
  category: 'Chat',
  description: 'ChatGPT 3.5 Turbo.',
  waitMessage: true,
  minArgs: 1,
  expectedArgs: '<link>',
  example: '{prefix}{command} hinamatsuri',
  callback: async ({ msg, fullArgs }) => {
    try {
      let { data } = await api('lolhuman').get('/api/openai-turbo', { params: { text: fullArgs } });
      await msg.reply(`*[Chat GPT 3.5]* \nHasil : ${data.result}`);
    } catch (error) {
      console.error('Terjadi kesalahan dalam permintaan:', error);
      await msg.reply('Terjadi kesalahan dalam permintaan. Mohon cek URL atau coba lagi nanti.');
    }
  },
}
