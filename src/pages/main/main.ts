import hbs_index from "./main.hbs"
import "./main.css"
import Block from "../../modules/Block"
import renderSideBarPreview from "../../components/side_bar/side_bar"
import renderChatPreview from "../../components/chat/chat"

export default class MainPage extends Block {
  render() {
    let outLine: string = "";
    outLine = hbs_index({
      side_bar: renderSideBarPreview(),
      main: renderChatPreview(),
    });

    return outLine;
  }
}
