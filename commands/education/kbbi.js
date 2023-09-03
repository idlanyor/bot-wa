const api = require('@libs/utils/api')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ['kbbi'],
  category: 'edukasi',
  description: 'Kamus Besar Bahasa Indonesia.',
  waitMessage: true,
  minArgs: 1,
  expectedArgs: '<query>',
  example: '{prefix}{command} ikhlas',
  callback: async ({ msg, fullArgs }) => {
    try {
      let { data } = await api('lolhuman').get('/api/kbbi', { params: { query: fullArgs } });
      var text = `\`\`\`Kata : ${data.result[0].nama}\`\`\`\n`
      text += `\`\`\`Kata Dasar : ${data.result[0].kata_dasar}\`\`\`\n`
      text += `\`\`\`Pelafalan : ${data.result[0].pelafalan}\`\`\`\n`
      text += `\`\`\`Bentuk Tidak Baku : ${data.result[0].bentuk_tidak_baku}\`\`\`\n\n`
      for (var x of data.result) {
        text += `\`\`\`Kode : ${x.makna[0].kelas[0].kode}\`\`\`\n`
        text += `\`\`\`Kelas : ${x.makna[0].kelas[0].nama}\`\`\`\n`
        text += `\`\`\`Artinya : \n${x.makna[0].kelas[0].deskripsi}\`\`\`\n\n`
        text += `\`\`\`Makna Lain : \n${x.makna[0].submakna}\`\`\`\n `
        text += `\`\`\`Contoh Kalimat : \n${x.makna[0].contoh}\`\`\`\n`
      }
      msg.reply(text)
    } catch (error) {
      console.error('Terjadi kesalahan dalam permintaan:', error);
      await msg.reply(`Yah,di Kamus Ngga ada kata .${fullArgs}`);
    }
  },
}

