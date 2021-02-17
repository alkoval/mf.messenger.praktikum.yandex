import { JSDOM } from "../node_modules/jsdom";
import * as chai from 'chai';

import HttpService from '../src/app/core/services/http.service'

const dom = new JSDOM(`<!DOCTYPE html><head></head><body><div class="chatapp"></div></body>`, {
    url: "https://localhost:8080/"
});

global.window = dom.window;
global.document = dom.window.document;

const httpService = new HttpService()