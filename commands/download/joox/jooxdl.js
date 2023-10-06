const api = require('@libs/utils/api')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    aliases: ['joox', 'jooxdl'],
    category: 'joox',
    description: 'Joox Music Downloader',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://www.instagram.com/reel/Cwke4-6IV6U',
    callback: async ({ msg, args }) => {
        return api('lolhuman')
            .get('/api/instagram', {
                params: {
                    url: args[0],
                },
            })
            .then(({ data }) => {
                data.result.forEach((url) => {
                    if (url.includes('.mp4')) {
                        return msg.replyVideo({ url })
                    } else {
                        return msg.replyImage({ url })
                    }
                })
            })
    },
}
