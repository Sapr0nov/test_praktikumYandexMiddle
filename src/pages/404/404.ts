import Handlebars = require('handlebars');
import hbs_404 from './404.hbs';
import glitch from '../../components/glitch_effect/glitch_effect.hbs';
import  './404.css';
import  '../../components/glitch_effect/glitch_effect.css';
import { Block } from '../../modules/Block';

export class Error404 extends Block {
    render() {
        let outLine:string = '';
        document.body.classList.add("e404");
        Handlebars.registerPartial('error_text', 'Ошибка 404')
        
        outLine = Handlebars.compile(hbs_404) ({
            link_text: "Начать с главной",
            glitch_effect: Handlebars.compile(glitch)
        })
    
        return outLine;
    }
}