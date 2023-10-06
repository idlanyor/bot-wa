const api = require('@libs/utils/api')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    aliases: ['ig2', 'ig-alt'],
    category: 'instagram',
    description: 'Instagram Downloader',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://www.instagram.com/reel/Cwke4-6IV6U',
    callback: async ({ msg, args }) => {
        return api('lolhuman')
            .get('/api/instagram2', {
                params: {
                    url: args[0],
                },
            })
            .then(({ data }) => {
                data.result.media.forEach((url) => {
                    if (url.includes('.mp4')) {
                        return msg.replyVideo({ url })
                    } else {
                        return msg.replyImage({ url })
                    }
                })
            })
    },
}
