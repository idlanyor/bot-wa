const api = require('@libs/utils/api')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ['anisearch', 'otakus'],
  category: 'anime',
  description: 'Anime Search Otakudesu',
  minArgs: 1,
  expectedArgs: '<judul anime>',
  waitMessage: true,
  example: '{prefix}{command} Hinamatsuri',
  callback: async ({ msg, fullArgs }) => {
    try {
      let { data } = await api('lolhuman').get('/api/otakudesusearch', { params: { query: fullArgs } })
      var text = `Title : ${data.result.title}\n`
      text += `Japanese : ${data.result.japanese}\n`
      text += `Judul : ${data.result.judul}\n`
      text += `Type : ${data.result.type}\n`
      text += `Episode : ${data.result.episodes}\n`
      text += `Aired : ${data.result.aired}\n`
      text += `Producers : ${data.result.producers}\n`
      text += `Genre : ${data.result.genres}\n`
      text += `Duration : ${data.result.duration}\n`
      text += `Studios : ${data.result.status}\n`
      text += `Rating : ${data.result.rating}\n`
      text += `Credit : ${data.result.credit}\n`
      for (var x in data.result.link_dl) {
        text += `\n\n*${data.result.link_dl[x].title}*\n`
        for (var y in data.result.link_dl[x].link_dl) {
          var info = data.result.link_dl[x].link_dl[y]
          text += `\n\`\`\`Reso : \`\`\`${info.reso}\n`
          text += `\`\`\`Size : \`\`\`${info.size}\n`
          text += `\`\`\`Link : \`\`\`\n`
          var link = info.link_dl
          for (var z in link) {
            text += `${z} - ${link[z]}\n`
          }
        }
      }
      await msg.reply(text)
    } catch (e) {
      await msg.reply('Terjadi kesalahan dalam permintaan. Mohon cek Query atau coba lagi nanti.');
    }
  },
}
