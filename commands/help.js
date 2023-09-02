const { listCommands, commands } = require('@libs/constants/command')
const { timeFormat } = require('@libs/utils')
const moment = require('moment-timezone')
require('moment/locale/id');
const config = require('@config')
const i18n = require('i18n')
const owner = require('./general/owner')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    aliases: ['allmenu'],
    callback: async ({ msg, client, args, prefix }) => {
        function formatDate() {
            moment.locale('id'); // Mengatur bahasa ke bahasa Indonesia
            const currentDate = moment(); // Membuat objek moment dari tanggal sekarang
            const formattedDate = currentDate.format('dddd, DD MMMM YYYY');
            return formattedDate;
        }
        function getCurrentTime() {
            const now = moment();
            const formattedTime = now.format('HH:mm');
            return formattedTime;
        }
        let tanggal = formatDate()
        let waktu = getCurrentTime()

        var text =
            `Hai ${msg.pushName || `@${msg.senderNumber}`}, Ada yang bisa dibantu?\n\n` +
            `―――――――――――――――\n` +
            `➣ Status : Free\n` +
            `➣ Tanggal : ${tanggal}\n` +
            `➣ Waktu : ${waktu} WIB\n` +
            `➣ Owner : ${config.ownerName}\n\n` +

            `Daftar Menu ${config.botName}\n\n` +
            `*CHAT GPT* \n` +
            `➣ .gpt(GPT Turbo 3.5)\n` +
            `➣ .chat(GPT Standar)\n` +
            `\n *YOUTUBE* \n` +
            `➣ .yts\n` +
            `➣ .play\n` +
            `➣ .ytmp3\n` +
            `➣ .ytmp4\n` +
            `\n *TIKTOK* \n` +
            `➣ .tiktok\n` +
            `➣ .tiktokmusic\n` +
            `\n *CHECKER* \n` +
            `➣ .cekpln(Cek Tagihan Listrik)\n` +
            `➣ .cekresi(Check Resi )\n` +
            `\n *EDUKASI* \n` +
            `➣ .brainly(Brainly)\n` +
            `➣ .kbbi(Kamus Besar Bahasa Indonesia)\n` +
            `➣ .rg(RoboGuru)\n` +
            `➣ .wiki(Wikipedia)\n` +
            `\n *ANIME* \n` +
            `➣ .anisearch(Cari anime berdasarkan judul)\n` +
            `➣ .animg(Cari anime berdasarkan gambar)\n` +
            `➣ .otakudesu(Dapatkan detail dan link download)\n` +
            `\n *MEME* \n` +
            `➣ .cmm(Change My Mind)\n` +
            `\n *YOUTUBE* \n` +
            `➣ .checker\n` +
            `\nCatatan:\n` +
            `Perlakukan bot secara baik, dev akan bertindak tegas apabila user melanggar rules.\n` +
            `_Butuh bantuan? hubungi ${config.ownerName} https://wa.me/${config.ownerNumber}_`

        return client.sendMessage(msg.from, {
            text,
            // footer: `© F ${config.botName}`,
            // title: `${config.botName} Help`,
            // templateButtons: [
            //     { index: 1, quickReplyButton: { displayText: 'Owner Bot', id: prefix + 'owner' } },
            //     { index: 2, quickReplyButton: { displayText: 'Menu Komplit', id: prefix + 'help listmenu' } },
            // ],
            viewOnce: true,
            mentions: [msg.sender],
        })
    },
}
