import Handlebars = require('handlebars');
import hbs_index from './index.hbs';
import  './index.css';
import { Block } from "../../modules/Block";
import { SideBar } from '../../components/side_bar/side_bar';
import { Chat } from '../../components/chat/chat.ts';

export class Index extends Block {
    render() {
        let outLine:string = '';
    
        outLine = Handlebars.compile(hbs_index) ({
            side_bar: new SideBar().render(),
            main: new Chat().render()
        })
    
        return outLine;
    }
}
