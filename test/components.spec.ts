import { JSDOM } from "../node_modules/jsdom";
import * as chai from 'chai';
import chaiDom from "chai-dom";
import Handlebars from "../node_modules/handlebars/dist/handlebars";

import Templator from "../static/js/core/services/templator.service";
import { ButtonComponent } from "../static/js/shared/components/button/button";
import { Button, BUTTON_STYLE } from "../static/js/shared/models/button";


chai.use(chaiDom);
const dom = new JSDOM(`<!DOCTYPE html><body><div id="root"></div></body>`);

global.window = dom.window;
global.document = dom.window.document;
global.Handlebars = Handlebars;

function consoleLog(msg: any) {
    console.log(msg)
}

describe("ButtonComponent", () => {
    const btn = new ButtonComponent({ "root": new Button('My button', BUTTON_STYLE.BG_DARK_GREEN, 'button') }, Templator.getInstance());
    it("Test ButtonComponent", () => {
        consoleLog(btn.getElement())
        chai.expect(btn.getElement()).to.have.class('card__button');
    });
});