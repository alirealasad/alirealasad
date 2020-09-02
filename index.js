const Mustache = require('mustache');
const fetch = require('node-fetch');
const fs = require('fs');

const MUSTACHE_MAIN_DIR = './main.mustache';

let DATA = {
  refresh_date: new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }),
};

async function getAnimes() {
  await fetch("https://api.jikan.moe/v3/top/anime/1/airing")
  .then(r => r.json())
  .then(r => {
    DATA.anime0 = r.top[0]
    DATA.anime1 = r.top[1]
    DATA.anime2 = r.top[2]
    DATA.anime3 = r.top[3]
    DATA.anime4 = r.top[4]
    DATA.anime5 = r.top[5]
    DATA.anime6 = r.top[6]
    DATA.anime7 = r.top[7]
    DATA.anime8 = r.top[8]
    DATA.anime9 = r.top[9]
    DATA.anime10 = r.top[10]
    DATA.anime11 = r.top[11]
    DATA.anime12 = r.top[12]
    DATA.anime13 = r.top[13]
    DATA.anime14 = r.top[14]
  })
}


async function generateReadMe() {
  await fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}

async function action() {

  await getAnimes()
  /**
   * Generate README
   */
  await generateReadMe();
}

action();
