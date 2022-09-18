import Route from "./Route";
import type Block from "./Block";

export default class Router {
  static __instance: Router;
  routes: Route[] = [];
  window: any = null;
  history: History | null = null;
  _currentRoute: Route | null = null;

  constructor(window: any) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this.window = window;
    this.routes = [];
    this.history = this.window.history;
    this._currentRoute = null;

    Router.__instance = this;
  }

  use(path: string, block: Block) {
    const route = new Route(path, block);
    this.routes.push(route);
<<<<<<< HEAD
=======
    return;
>>>>>>> main
  }

  start() {
    this.window.onpopstate = ((e: Event) => {
      const target = <Window>e.currentTarget;
      this._onRoute(target.location.pathname);
    }).bind(this);
    this._onRoute(this.window.location.pathname);
  }

  _onRoute(path: string) {
    const route = this.getRoute(path);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render(route, path);
  }

<<<<<<< HEAD
  refresh() {
    console.log("refresh");
    this._currentRoute?.render(this._currentRoute, document.location.pathname);
  }

  go(path: string) {
    this.history!.pushState({}, "", path);
    this._onRoute(path);
=======
  go(path: string) {
    this.history!.pushState({}, "", path);
    this._onRoute(path);
    return;
>>>>>>> main
  }

  back() {
    this.history!.back();
  }

  forward() {
    this.history!.forward();
  }

  getRoute(path: string) {
    return this.routes.find((route) => route._path === path);
  }
}
