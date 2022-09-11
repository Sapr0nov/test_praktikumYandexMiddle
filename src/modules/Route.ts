import Block from "./Block";
import { bus as eventsBus } from "./EventBus";

export default class Route {
  _path: string | null;
  _block: ChildNode | null;
  _blockClass: Block;
  _ROOT: string = "root";

  constructor(path: string, view: Block, root: string = "root") {
    this._path = path;
    this._blockClass = view;
    this._block = null;
    this._ROOT = root;
  }

  navigate(path: string) {
    if (path === this._path) {
      this._path = path;
      this.render(this, path);
    }
  }

  leave() {
    if (this._block) {
      this._block.remove();
    }
  }

  render(route: Route, path: string) {
    route._block;
    if (route._path !== path) {
      route.leave;
    }
    this._block = new DOMParser().parseFromString(
      this._blockClass.render(),
      "text/html"
    ).body.firstChild;
    const parentBlock = document.getElementById(this._ROOT);
    if (parentBlock && this._block) {
      parentBlock.textContent = "";
      parentBlock.appendChild(this._block);
      eventsBus.dispatch("rendered", this._block);
      return this._block;
    }
    return null;
  }
}
