import Handlebars from "handlebars";
import hbs_500 from "./500.hbs";
import "./500.css";
import image from "../../../static/500/500error.png";
import { Block } from "../../modules/Block";

export class Error500 extends Block {
  render() {
    let outLine: string = "";
    outLine = Handlebars.compile(hbs_500)({
      text_error: "ошибка 500: Сервер не отвечает",
      sorry_text:
        "Мы почти закончили <br>Скоро <br/>всё снова будет работать  <br>для вас",
      image: image,
    });

    return outLine;
  }
}
