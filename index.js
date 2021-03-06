const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const dir = './memes';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on('close', callback);
  });
};

request(
  {
    url: 'https://memegen.link/examples',
  },
  function(error, response, body) {
    const $ = cheerio.load(body);

    const imgSrcs = $('img')
      .map(function() {
        return 'https://memegen.link' + $(this).attr('src');
      })
      .get();

    const firstTenImgs = imgSrcs.slice(0, 10);

    firstTenImgs.forEach(function(value, index) {
      download(value, './memes/image' + index + '.png', function() {
        console.log('done');
      });
    });
  },
);
