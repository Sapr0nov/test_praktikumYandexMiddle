import {button} from './components/button/button'

const root = document.querySelector('#root');

root.textContent = "test" + button(6, -1).toString(); 