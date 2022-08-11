import { stringify } from "querystring";
import { EventBus } from "./EventBus.ts";

export class Block {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render"
    };
  
    _element = null;
    _meta = null;
    props: any;
    eventBus = new EventBus();


    constructor(tagName = "div", props = {}) {

      this._meta = {
        tagName,
        props
      };
  
      this.props = this._makePropsProxy(props);
  
      this._registerEvents(this.eventBus);
      this.eventBus.dispatch(Block.EVENTS.INIT);
    }
  
    _registerEvents(eventBus) {
      eventBus.register(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.register(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.register(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.register(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
  
    _createResources() {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    }
  
    init() {
      this._createResources();
        this.eventBus.dispatch(Block.EVENTS.FLOW_RENDER);
}
  
    _componentDidMount() {
      this.componentDidMount(this);
    }
  
    componentDidMount(oldProps) {}  
      dispatchComponentDidMount() {
    this.eventBus.dispatch(Block.EVENTS.FLOW_CDM);
      }
  
    _componentDidUpdate(oldProps, newProps) {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (!response) {
        return;
      }
      this._render();
    }
  
    componentDidUpdate(oldProps, newProps) {
      return true;
    }
  
    setProps = nextProps => {
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
      this._element.innerHTML = block;
    }
  
    render() {
      let result:string;
      return result;
    }
  
    getContent() {
      return this.element;
    }
  
    _makePropsProxy(props) {
      const self = this;
  
      return new Proxy(props, {
        get(target, prop) {
          const value = target[prop];
          return typeof value === "function" ? value.bind(target) : value;
        },
        set(target, prop, value) {
          target[prop] = value;
          
          // Запускаем обновление компоненты
          // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
          this.eventBus.dispatch(Block.EVENTS.FLOW_CDU, {...target});

          return true;
        },
        deleteProperty() {
          throw new Error("Нет доступа");
        }
      });
    }
  
    _createDocumentElement(tagName) {
      // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
      return document.createElement(tagName);
    }
  
    show() {
      this.getContent().style.display = "block";
    }
  
    hide() {
      this.getContent().style.display = "none";
    }
  }