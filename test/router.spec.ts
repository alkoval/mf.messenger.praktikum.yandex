import { JSDOM } from "../node_modules/jsdom";
import * as chai from 'chai';

import { NavItem } from "../src/app/shared/shared.interfaces";
import { Error404PageComponent } from "../src/app/pages/error-404/error-404";

const dom = new JSDOM(`<!DOCTYPE html><head></head><body><div class="chatapp"></div></body>`, {
    url: "https://localhost:8080/"
});

global.window = dom.window;
global.document = dom.window.document;

import { Router } from "../src/app/core/router/router";
const router = Router.getInstance();
const routes: NavItem[] = [
    { text: 'Путь 1', icon: 'far fa-file list__icon', path: '/test1', component: Error404PageComponent, guard: null },
    { text: 'Путь 2', icon: 'far fa-file list__icon', path: '/test2', component: Error404PageComponent, guard: null },
    { text: 'Путь 3', icon: 'far fa-file list__icon', path: '/test3', component: Error404PageComponent, guard: null },
];
router.use(routes);
router.start();

router.go('/test1');
router.go('/test2');
router.go('/test3');

describe("Router method: back", () => {
    router.back();
    it("Test Router method: back", () => {
        chai.expect(window.location.pathname).to.equal('/test2');
    });
});

describe("Router method: forward", () => {
    router.back();
    router.forward();
    it("Test Router method: forward", () => {
        chai.expect(window.location.pathname).to.equal('/test2');
    });
});