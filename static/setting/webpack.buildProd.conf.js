const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../../build'),
    distData: path.join(__dirname, '../../'),
    assets: 'assets/'
};
const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

async function setActualData() {
    //- 'http://bvc.site-creator4u.ru/data/companies.json'
    const data = await fetch(`https://bvc.site-creator4u.ru/data/bvc-data.json`)
        .then((response) => {
            return response.json();
        })
    fs.writeFileSync(`${PATHS.distData}/data/bvc-data_local.json`, JSON.stringify(data))
};
setActualData()
// module.exports = getData;

const IconsFiles = path.join(__dirname, '../src/assets') + '/img/icons';
const SpriteFiles = path.join(__dirname, '../src/assets') + '/img/svg';

function createListOfIcon() {
    // create list from icons
    fs.readdir(IconsFiles, (err, files) => {
        if (err)
            console.log(err);
        else {
            let res = [];
            files.forEach(fileName => {
                const data = fs.readFileSync(IconsFiles + '/' + fileName,{encoding:'utf8', flag:'r'});

                let match = data.match(/data-sorting=\"(.+?)\"/g);
                let name = fileName.replace('.svg', '');
                let file = {name, sortingParams: []};

                if(match){
                    let sortingParams = match[0].replace('data-sorting=\"','').replace('"','').split(' ');
                    file = {name, sortingParams}
                }

                res.push(file);
            })
            // console.log(res)
            if(res.length > 0){
                fs.writeFileSync(`${PATHS.distData}/data/iconsList.json`, JSON.stringify(res))
            }
        }
    })
    // create list from sprite
    fs.readdir(SpriteFiles, (err, files) => {
        if (err)
            console.log(err);
        else {
            if(files.length > 0){
                let data = files.filter(e => e.includes('.svg'));
                data = [...data].map(e => e.replace(/.svg/g, ''))
                fs.writeFileSync(`${PATHS.distData}/data/spritesList.json`, JSON.stringify(data))
            }
        }
    })
}
createListOfIcon();


const buildWebpackConfig = merge(baseWebpackConfig, {
    // BUILD config
    mode: 'production',
    plugins: []
});

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig)
});
