const request = require('request');
const cheerio = require('cheerio');

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
    console.log(imgSrcs);

    const [
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
      eigth,
      ninth,
      tenth,
    ] = imgSrcs;
    console.log(
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
      eigth,
      ninth,
      tenth,
    );
  },
);

let fs = require('fs');
let dir = './memes';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
/*  console.log(body);*/

//=> "apple orange pear"

/**/
