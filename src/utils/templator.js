
export class Templator {
    constructor(root) { // Элемент куда будет вставляться блоки
      this.root = root;
    }
    render (element) {
        document.querySelector('this.root').appendChild(element);
    }
  }


/*
const element = (
    <h1 className="greeting">
      Привет, мир!
    </h1>
  );

  const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Привет, мир!'
  );

  function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  
  root.render(element);
}

*/