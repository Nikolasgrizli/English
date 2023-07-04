// JS
import './assets/js'

// SCSS
import './assets/scss/main.scss'
import './assets/scss/service.scss'

// SVG
function requireAll(r) {
    r.keys().forEach(r);
}
requireAll(require.context('./assets/img/svg/', true, /\.svg$/));

// CSS



