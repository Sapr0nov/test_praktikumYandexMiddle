/*
Комментарии вида / *   * / вырезаются
Оборачивется только в один элемент как в jsx

*/

export default class Templator2 {
  constructor(root) { // Элемент куда будет вставляться блоки
      this.root = root;
      this.localRoot;
  }
  template(data, source) {
    const localRoot = document.createElement("div");
    let src =  source.replace ( /\/\*[^]*?\*\//g, '' ); // remove /* comments */ 
    
    const regPattern = /\{\%\s*[a-zA-Z0-9._/:-]+?\s*\%\}/g;
    const regTags = /(<([^>]+)>)/ig;
    // строковые куски
    let parts = src.split (regTags);
    // сами спички s
    let matches = src.match (regTags);
    
    localRoot.innerText = "AAAAAA";
    let currLevel = localRoot;
    let currTag;
      
    for (let tagIndex in matches) {
      let tagname = matches[tagIndex].replace (/^\<\s*|\s*\>$/g, '');
      if (tagname[0] === '/') {
        currLevel.appendChild(currTag);			    
      } else {
        if (tagname) {
          currTag = document.createElement(tagname);
        }
    }
  }
  this.localRoot = localRoot;
  return void 0;
  };


  render () {
      this.root.appendChild(this.localRoot);
  }

  
  deeps (obj, val) { // function deep search 
    let hs = val.split('.');
    let len = hs.length;
    let deep;
    let num = 0;

    for (let i = 0; i < len; i++) {
      let el = hs[i];
      if (deep) {
        if (deep[el]) {
          deep = deep[el];
          num++;
        }
      } else {
        if (obj[el]) {
          deep = obj[el];
          num++;
        }
      }
    }
    
    if (num == len) {
      return deep;
    } else {
      return void 0;
    }
  }
}
/*

testsource = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
"{{kids.length}} kids:</p>" +
"<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
test2 = "<div><h1>Category: {{category}}</h1>" + 
"<ol>" +
"{% items %}" +
"   <li>{{ . }}</li>" +
"{% / %}" +
"</ol></div>";

tmpl = new Templator();
let a = tmpl.template({ "name": "Alan", "hometown": "Somewhere, TX",
  "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]}, test2);

console.log(a);

*/
/*

var template = "<h1>Category: {{category}}</h1>\n" +
"<ol>\n" +
"{# items must be non-empty for valid markup #}" + 
"{% items %}" +
"   <li>{{ . }}</li>\n" +
"{% / %}" +
"</ol>\n";
var result = render(template, {
category: "Fruits",
items: ["Mango", "Banana", "Orange" ]
});
Результатом обработки будет:
<h1>Category: Fruits</h1>
<ol>
<li>Mango</li>
<li>Banana</li>
<li>Orange</li>
</ol>

*/

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


/*/*var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
           "{{kids.length}} kids:</p>" +
           "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
var template = Handlebars.compile(source);

var data = { "name": "Alan", "hometown": "Somewhere, TX",
           "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
var result = template(data);

// Would render:
// <p>Hello, my name is Alan. I am from Somewhere, TX. I have 2 kids:</p>
// <ul>
//   <li>Jimmy is 12</li>
//   <li>Sally is 4</li>
// </ul>
*/