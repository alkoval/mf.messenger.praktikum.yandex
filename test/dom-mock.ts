import { JSDOM } from "../node_modules/jsdom";
import * as chai from 'chai';
import chaiDom from "chai-dom";
import Handlebars from "../node_modules/handlebars/dist/handlebars";

chai.use(chaiDom);
const dom = new JSDOM(`<!DOCTYPE html><head></head><body><div class="chatapp"></div></body>`, {
    url: "https://example.org/",
    referrer: "https://example.com/",
});

global.window = dom.window;
global.document = dom.window.document;
global.Handlebars = Handlebars;