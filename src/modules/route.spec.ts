import Block from "./Block";

const { describe, it } = require("mocha");
const Router = require("./Route");
const chai = require("chai");
const { expect } = chai;

const router = new Router.default("path", Block);
describe("Check default parentNode ", () => {
  it("default Parent Id", (done: Function) => {
    expect(router._ROOT).to.equals("root");
    done();
  });
});
describe("check path in route", () => {
  it("path", (done: Function) => {
    expect(router._path).to.equals("path");
    done();
  });
});
