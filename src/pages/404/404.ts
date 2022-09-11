import hbs_404 from "./404.hbs";
import glitch from "../../components/glitch_effect/glitch_effect.hbs";
import "./404.css";
import "../../components/glitch_effect/glitch_effect.css";
import Block from "../../modules/Block";

export default class Error404 extends Block {
  render() {
    let outLine: string = "";

    outLine = hbs_404({
      link_text: "Начать с главной",
      glitch_effect: glitch({}),
    });

    return outLine;
  }
}
