import hbs_500 from "./500.hbs";
import "./500.css";
<<<<<<< HEAD
import image from "Static/500/500error.png";
import Block from "Modules/Block";

export default class Error500 extends Block {
  constructor() {
    super();
    this._name = "Error500";
    this.eventBus.register("flow:render:" + this._name, () => {
      document.body.classList.add("e500");
    });
  }

=======
import image from "../../../static/500/500error.png";
import Block from "../../modules/Block";

export default class Error500 extends Block {
>>>>>>> main
  render() {
    let outLine: string = "";
    outLine = hbs_500({
      text_error: "ошибка 500: Сервер не отвечает",
      sorry_text:
        "Мы почти закончили <br>Скоро <br/>всё снова будет работать  <br>для вас",
      image: image,
    });

    return outLine;
  }
}
