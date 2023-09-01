const { listCommands, commands } = require('@libs/constants/command')
const { timeFormat } = require('@libs/utils')
const moment = require('moment-timezone')
const config = require('@config')
const i18n = require('i18n')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    aliases: ['menu'],
    callback: async ({ msg, client, args, prefix }) => {
        if (args.length > 0) {
            if (args[0] === 'listmenu') {
                var sections = []
                for (var title in listCommands) {
                    sections.push({
                        title: title.toUpperCase(),
                        rows: listCommands[title].map((v) => ({
                            title: v,
                            rowId: `${prefix}help ${v}`,
                            description: commands.get(v).description,
                        })),
                    })
                }

                return client.sendMessage(msg.from, {
                    title: `Daftar Perintah ${config.botName}`,
                    text: `Ketik type ${prefix}help <command>`,
                    footer: `© ${config.botName} Bot`,
                    buttonText: 'Daftar Menu',
                    sections,
                    viewOnce: true,
                })
            }

            /**
             * @type { import('@libs/builders/command').ICommand }
             */
            let command = commands.get(args[0]) || commands.find((v) => v?.aliases?.includes(args[0]))
            if (command) {
                let text = `*➪ Perintah :* ${args[0]}\n`
                text += `*➪ Alias :* ${command?.aliases?.join(', ') || '-'}\n`
                text += `*➪ Kategori :* ${command.category}\n`
                if (command?.groupOnly) {
                    text += `*➪ Khusus Grup :* Yes\n`
                }
                if (command?.adminOnly) {
                    text += `*➪ Khusus Admin :* Yes\n`
                }
                if (command?.privateOnly) {
                    text += `*➪ Khusus Japri :* Yes\n`
                }
                if (command?.premiumOnly) {
                    text += `*➪ Khusus Premium :* Yes\n`
                }
                if (command?.ownerOnly) {
                    text += `*➪ Khusus Roy😎 :* Yes\n`
                }
                text += `*➪ Deskripsi :* ${command.description}\n`
                text += `*➪ Contoh :* ${command?.example?.format({ prefix, command: args[0] }) || `${prefix}${args[0]}`}`
                return client.sendMessage(msg.from, {
                    text: text.trim(),
                    templateButtons: [
                        {
                            urlButton: {
                                displayText: 'Copy',
                                url: `https://www.whatsapp.com/otp/copy/${prefix}${args[0]}`,
                            },
                        },
                    ],
                    viewOnce: true,
                })
            } else {
                return msg.reply(i18n.__('command.not_found', { command: args[0] }))
            }
        }

        var text =
            `Hai ${msg.pushName || `@${msg.senderNumber}`}, Ada yang bisa dibantu?\n\n` +
            `―――――――――――――――\n` +
            `🕰️ *Waktu Server:* ${moment().locale('id').tz(config.timezone).format('dddd, DD MMMM YYYY HH:mm:ss')}\n` +
            `🗒️ *Total perintah:* ${commands.size}/100\n` +
            `❕ *Prefix:* (.)=>pake titik\n` +
            `❕ *Owner:* Roynaldi 😎\n` +
            `―――――――――――――――\n\n`

        return client.sendMessage(msg.from, {
            text,
            footer: `© F ${config.botName}`,
            title: `${config.botName} Help`,
            templateButtons: [
                { index: 1, quickReplyButton: { displayText: 'Owner Bot', id: prefix + 'owner' } },
                { index: 2, quickReplyButton: { displayText: 'Menu Komplit', id: prefix + 'help listmenu' } },
            ],
            viewOnce: true,
            mentions: [msg.sender],
        })
    },
}
