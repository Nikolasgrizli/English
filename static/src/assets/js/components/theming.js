const btn = document.querySelector(".js-btn-dayNight .switch__input");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;


(function firstLoadTheming(){
    const currentTheme = localStorage.getItem("theme");

    // console.log(prefersDarkScheme)
    // console.log(!!currentTheme);
    if(!!currentTheme){
        if (currentTheme == "dark") {
            document.documentElement.classList.add("dark-theme");
            document.documentElement.classList.remove("light-theme");
            if(!!btn) {
                btn.checked = false;
            }
        } else if (currentTheme == "light") {
            document.documentElement.classList.add("light-theme");
            document.documentElement.classList.remove("dark-theme");
            if(!!btn) {
                btn.checked = true;
            }
        }
    } else {
        if (prefersDarkScheme) {
            document.documentElement.classList.add("dark-theme");
            document.documentElement.classList.remove("light-theme");
            if(!!btn) {
                btn.checked = false;
            }
        } else {
            document.documentElement.classList.add("light-theme");
            document.documentElement.classList.remove("dark-theme");
            if(!!btn) {
                btn.checked = true;
            }
        }
    }

    changeLogosSrc()
})();


if (!!btn) {
    btn.addEventListener("change", function () {
        if(btn.checked){
            document.documentElement.classList.add("light-theme");
            document.documentElement.classList.remove("dark-theme");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark-theme");
            document.documentElement.classList.remove("light-theme");
            localStorage.setItem("theme", "dark");
        }
        changeLogosSrc()
    });
}


document.addEventListener("DOMContentLoaded", function(event) {
    // change logo imgs src dependenced active theme
    let imgs = document.querySelectorAll('.company-logo img');
    if(imgs.length > 0){
        Promise.all(Array.from(imgs).map(img => {
            if (img.complete)
                return Promise.resolve(img.naturalHeight !== 0);
            return new Promise(resolve => {
                img.addEventListener('load', () => resolve(true));
                img.addEventListener('error', () => resolve(false));
            });
        })).then(results => {
            if (results.every(res => res)){
                console.log('all images loaded successfully');
                changeLogosSrc();
            } else {
                console.log('some images failed to load, all finished loading');
            }
        });

    }
})


function changeLogosSrc(){
    let imgs = document.querySelectorAll('.company-logo img');
    let themeDark = ( window.matchMedia("(prefers-color-scheme: dark)").matches || document.documentElement.classList.contains("dark-theme") ) ? true : false;
    // console.log(logosTest);
    // console.log(themeDark);
    if(imgs.length > 0){
        let logosTest = imgs[0].src.includes("_dark-theme");
        if(themeDark){
            if(!logosTest){
                imgs.forEach(img=>{
                    const imgSrcOld = img.src;
                    img.src = imgSrcOld.replace(/\.svg/, '_dark-theme.svg');
                })
            }
        } else {
            if(logosTest){
                imgs.forEach(img=>{
                    const imgSrcOld = img.src;
                    img.src = imgSrcOld.replace(/\_dark-theme.svg/, '.svg');
                })
            }
        }
    }
}