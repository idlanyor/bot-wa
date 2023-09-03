const api = require('@libs/utils/api');
const FormData = require('form-data');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs'); // Import modul 'fs'

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ['animg', 'wait'],
  category: 'anime',
  description: 'Search anime by image',
  waitMessage: 'Bentar, lagi dicari nih...',
  callback: async ({ msg }) => {
    try {
      const file = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')));
      var form = new FormData();
      form.append('img', file, 'tahu.jpg');
      if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) {
        const { data } = await api('lolhuman').post('/api/wait', form, {
          headers: form.getHeaders(),
        });
        let outputPath = 'video.mp4';
        ffmpeg(data.result.video)
          // .input() // Input video dari hasil API
          .output(outputPath) // Output video setelah konversi
          .on('end', async () => {
            var caption = `Anilist id: ${data.result.anilist_id}\n`;
            caption += `MAL id: ${data.result.mal_id}\n`;
            caption += `Title Romaji: ${data.result.title_romaji}\n`;
            caption += `Title Native: ${data.result.title_native}\n`;
            caption += `Title English: ${data.result.title_english}\n`;
            caption += `at: ${data.result.at}\n`;
            caption += `Episode: ${data.result.episode}\n`;
            caption += `Similarity: ${data.result.similarity}`;

            // Mengirim video yang telah dikonversi
            await msg.replyVideo({ url: outputPath }, caption);

            // Menghapus file video sementara
            fs.unlinkSync(outputPath);
          }).toFormat('webm')
          .on('error', (err) => {
            console.error('Error converting video:', err);
            msg.reply('Terjadi kesalahan dalam mengkonversi video.');
          })
          .run();
      } else {
        msg.reply('Maaf, gambar yang Anda kirim tidak valid. Pastikan itu adalah gambar anime.');
      }
    } catch (error) {
      msg.reply('Terjadi kesalahan dalam mencari anime. Mohon coba lagi nanti.');
      console.error('Terjadi Kesalahan:', error);
    }
  }
};
