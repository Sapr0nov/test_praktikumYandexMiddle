import hbs_404 from "./404.hbs";
import glitch from "../../components/glitch_effect/glitch_effect.hbs";
import "./404.css";
import "../../components/glitch_effect/glitch_effect.css";
<<<<<<< HEAD
import Block from "Modules/Block";

export default class Error404 extends Block {
  constructor() {
    super();
    this._name = "Error404";
    this.eventBus.register("flow:render:" + this._name, () => {
      document.body.classList.add("e404");
    });
  }
=======
import Block from "../../modules/Block";

export default class Error404 extends Block {
>>>>>>> main
  render() {
    let outLine: string = "";

    outLine = hbs_404({
      link_text: "Начать с главной",
      glitch_effect: glitch({}),
    });

    return outLine;
  }
}
