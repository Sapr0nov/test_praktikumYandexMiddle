interface Meta {
    tagName: string;
    props: Object;
  }
  interface EventBus {
    dispatch: Function;
    register: Function;
  }
  import { bus as eventsBus } from "./EventBus";
  
  export default class Block {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render",
    };
  
    _element: HTMLElement | null = null;
    _meta: Meta | null = null;
    props: Object;
    eventBus: EventBus = eventsBus;
  
    constructor(tagName: string = "div", props: Object = {}) {
      this._meta = {
        tagName,
        props,
      };
  
      this.props = this._makePropsProxy(props);
  
      this._registerEvents(this.eventBus);
      this.eventBus.dispatch(Block.EVENTS.INIT);
    }
  
    _registerEvents(eventBus: EventBus) {
      eventBus.register(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.register(
        Block.EVENTS.FLOW_CDM,
        this._componentDidMount.bind(this)
      );
      eventBus.register(
        Block.EVENTS.FLOW_CDU,
        this._componentDidUpdate.bind(this)
      );
      eventBus.register(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
  
    _createResources() {
      const tagName = this._meta?.tagName;
      this._element = this._createDocumentElement(tagName ? tagName : "div");
    }
  
    init() {
      this._createResources();
      this.eventBus.dispatch(Block.EVENTS.FLOW_RENDER);
    }
  
    _componentDidMount() {
      this.componentDidMount(this);
    }
  
    componentDidMount(oldProps: Object) {
      return oldProps;
    }
  
    dispatchComponentDidMount() {
      this.eventBus.dispatch(Block.EVENTS.FLOW_CDM);
    }
  
    _componentDidUpdate(oldProps: Object, newProps: Object) {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (!response) {
        return;
      }
      this._render();
    }
  
    componentDidUpdate(oldProps: Object, newProps: Object) {
      if (JSON.stringify(oldProps) !== JSON.stringify(newProps)) return true;
    }
  
    setProps = (nextProps: Object) => {
      if (!nextProps) {
        return;
      }
  
      Object.assign(this.props, nextProps);
    };
  
    get element() {
      return this._element;
    }
  
    _render() {
      const block = this.render();
      // Этот небезопасный метод для упрощения логики
      // Используйте шаблонизатор из npm или напишите свой безопасный
      // Нужно не в строку компилировать (или делать это правильно),
      // либо сразу в DOM-элементы возвращать из compile DOM-ноду
      if (this._element) {
          this._element.innerHTML = block;
      }else{
        this._element = null;
      }
    }
  
    render() {
      let result: string = "";
      return result;
    }
  
    getContent() {
      return this.element;
    }
  
    _makePropsProxy(props: any) {
      return new Proxy(props, {
        get(target, prop) {
          const value = target[prop];
          return typeof value === "function" ? value.bind(target) : value;
        },
        set(target, prop, value) {
          target[prop] = value;
  
          return true;
        },
        deleteProperty() {
          throw new Error("Нет доступа");
        },
      });
    }
  
    _createDocumentElement(tagName: string) {
      // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
      return document.createElement(tagName);
    }
  
    show() {
      const element: HTMLElement = this.getContent()!;
      element.style.display = "block";
    }
  
    hide() {
      const element: HTMLElement = this.getContent()!;
      element.style.display = "none";
    }
  }
  