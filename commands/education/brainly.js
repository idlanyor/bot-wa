const api = require('@libs/utils/api')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ['by', 'brainly'],
  category: 'edukasi',
  description: 'Brainly Scrapper.',
  waitMessage: true,
  minArgs: 1,
  expectedArgs: '<query>',
  example: '{prefix}{command} tahun berapa indonesia merdeka',
  callback: async ({ msg, fullArgs }) => {
    try {
      let { data } = await api('lolhuman').get('/api/brainly', { params: { query: fullArgs } });
      var text = 'Beberapa Pembahasan Dari Brainly :\n\n'
      for (var x of data.result) {
        text += `==============================\n`
        text += `\`\`\`Pertanyaan :\`\`\`\n${x.question.content}\n\n`
        text += `\`\`\`Jawaban :\`\`\`\n${x.answer.content}\n`
        text += `==============================\n\n`
      }
      msg.reply(text)
    } catch (error) {
      console.error('Terjadi kesalahan dalam permintaan:', error);
      await msg.reply('Terjadi kesalahan dalam permintaan. Mohon cek URL atau coba lagi nanti.');
    }
  },
}

