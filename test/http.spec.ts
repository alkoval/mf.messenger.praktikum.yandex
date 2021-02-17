import * as chai from 'chai';
import sinon from 'sinon';

import HttpService, { METHODS } from '../src/app/core/services/http.service';

const httpService = new HttpService('');
let server;

describe("Test HTTP module", () => {
    before(() => {
        global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
        server = sinon.fakeServer.create();
    });
    after(() => {
        server.restore();
    });

    it("Test HTTP module: GET", () => {
        httpService.get("/test", null, {});
        chai.expect(server.requests[0].method).to.equal(METHODS.GET);
    });
    it("Test HTTP module: POST", () => {
        httpService.post("/test2", {});
        chai.expect(server.requests[1].method).to.equal(METHODS.POST);
    });
    it("should send request type PUT", () => {
        httpService.put("/test2", {});
        chai.expect(server.requests[2].method).to.equal(METHODS.PUT);
    })
    it("should send request type DELETE", () => {
        httpService.delete("/test3", {});
        chai.expect(server.requests[3].method).to.equal(METHODS.DELETE);
    });
});