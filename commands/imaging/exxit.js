const config = require('@config');
const axios = require('axios').default;
const i18n = require('i18n');

const gpt3 = axios.create({
    baseURL: 'https://api.openai.com/v1/chat/completions',
    headers: {
        'Authorization': 'Bearer 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'
    }
});

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    aliases: ['gpt3'], // Menggunakan alias 'gpt3' untuk memanggil command
    category: 'gpt3',
    description: 'Generate text using GPT-3', // Deskripsi command
    waitMessage: 'Please wait, calling GPT-3...', // Pesan yang ditampilkan saat menunggu respon
    callback: async ({ msg, fullArgs }) => {
        try {
            // Buat permintaan ke endpoint GPT-3 dengan data yang sesuai
            const response = await gpt3.post('', {
                model: 'gpt-3.5-turbo', // Model GPT-3 yang ingin digunakan
                messages: [
                    {
                        role: 'user',
                        content: fullArgs,
                    },
                ],
            });
            
            // Tanggapi respons dari API GPT-3 sesuai dengan kebutuhan Anda
            const generatedText = response.data.choices[0].message.content;
            
            // Kirim pesan yang dihasilkan dari GPT-3 ke pengguna
            msg.reply(generatedText);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            msg.reply('An error occurred while calling GPT-3.');
        }
    },
};
