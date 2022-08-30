import Handlebars from 'handlebars';
import hbs_index from './index.hbs';
import  './index.css';
import { Block } from "../../modules/Block";
import { renderSideBarPreview } from '../../components/side_bar/side_bar';
import { renderChatPreview } from '../../components/chat/chat';

export class Index extends Block {
    render() {
        let outLine:string = '';
        outLine = Handlebars.compile(hbs_index) ({
            side_bar: renderSideBarPreview(),
            main: renderChatPreview()
        })
    
        return outLine;
    }
}