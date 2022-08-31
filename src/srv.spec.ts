const {describe, it }  = require('mocha');
const srv = require("../src/srv.js");
const chaiHttp = require("chai-http");
const chai = require("chai");
const { expect } = chai;
chai.use(chaiHttp);

describe("Testing web server routing ", () => {
  it("index", (done:Function) => {
    chai
      .request(srv)
      .get("/")
      .end((err:string|null, res:any) => {
        expect(res.statusCode).to.equals(200);
        expect(res).to.be.html;
        done();
        if (err) {console.log(err)};
    });
  })
  it("page 404", (done:Function) => {
    chai
      .request(srv)
      .get("/404/")
      .end((err:string|null, res:any) => {
        expect(res.statusCode).to.equals(200);
        expect(res).to.be.html;
        done();
        if (err) {console.log(err)};
    });
  })
  it("messenger", (done:Function) => {
    chai
      .request(srv)
      .get("/messenger")
      .end((err:string|null, res:any) => {
        expect(res.statusCode).to.equals(200);
        expect(res).to.be.html;
        done();
        if (err) {console.log(err)};
    });
  })
  it("setting", (done:Function) => {
    chai
      .request(srv)
      .get("/settings")
      .end((err:string|null, res:any) => {
        expect(res.statusCode).to.equals(200);
        expect(res).to.be.html;
        done();
        if (err) {console.log(err)};
    });
  })
})
export {};