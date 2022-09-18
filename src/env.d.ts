<<<<<<< HEAD
declare module "*.hbs" {
  import type { TemplateDelegate } from "handlebars";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const template: TemplateDelegate<any>;
  export default template;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
=======
declare module '*.hbs' {
  import type { TemplateDelegate } from 'handlebars'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const template: TemplateDelegate<any>
  export default template
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
>>>>>>> main
}

declare module "*.png" {
  const value: any;
  export default value;
<<<<<<< HEAD
}
=======
}
>>>>>>> main
