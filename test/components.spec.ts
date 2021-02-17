import { JSDOM } from "../node_modules/jsdom";
import * as chai from 'chai';
import chaiDom from "chai-dom";
import Handlebars from "../node_modules/handlebars/dist/handlebars";

import Templator from "../src/app/core/services/templator.service";
import { ButtonComponent } from "../src/app/shared/components/button/button";
import { Button, BUTTON_STYLE } from "../src/app/shared/models/button";
import { FormCard, FormField, TextLink } from "../src/app/shared/shared.models";
import { Notify } from "../src/app/shared/shared.interfaces";
import { FormCardComponent } from "../src/app/shared/components/form-card/form-card";
import { FormFieldComponent } from "../src/app/shared/components/form-field/form-field";
import { NotifyComponent } from "../src/app/shared/components/notify/notify";
import { ProfileGroupTextComponent } from "../src/app/shared/components/profile-group-text/profile-group-text";
import { ProfileGroupInputComponent } from "../src/app/shared/components/profile-group-input/profile-group-input";
import { TextLinkComponent } from "../src/app/shared/components/text-link/text-link";

chai.use(chaiDom);
const dom = new JSDOM(`<!DOCTYPE html><body><div id="root"></div></body>`);

global.window = dom.window;
global.document = dom.window.document;
global.Handlebars = Handlebars;

const templator = Templator.getInstance();

describe("ButtonComponent", () => {
    const btnComponent = new ButtonComponent({ "root": new Button('My button', BUTTON_STYLE.BG_DARK_GREEN, 'button') }, templator);
    it("Test ButtonComponent", () => {
        chai.expect(btnComponent.getElement()).to.have.class('card__button');
    });
});

describe("FormCardComponent", () => {
    const form = new FormCard('Вход', 'Авторизоваться', '/signin', 'Нет аккаунта?');
    form.fields.push(new FormField('text', 'login', 'Логин', 'Некорректное значение', 'word'));
    form.fields.push(new FormField('password', 'password', 'Пароль', 'Некорректное значение', 'word'));
    const fromComponent = new FormCardComponent({ "root": form }, templator);

    it("Test FormCardComponent", () => {
        chai.expect(fromComponent.getElement()).to.have.class('card');
    });
});

describe("FormFieldComponent", () => {
    const field = new FormField('text', 'userName', 'Логин пользователя', '', '');
    const fromComponent = new FormFieldComponent({ "root": field }, templator);

    it("Test FormFieldComponent", () => {
        chai.expect(fromComponent.getElement()).to.have.class('form-field');
    });
});

describe("NotifyComponent", () => {
    const notify: Notify = { message: 'text', time: 5000 };
    const notifyComponent = new NotifyComponent({ "root": { message: 'text', time: 5000 } }, Templator.getInstance());

    it("Test NotifyComponent", () => {
        chai.expect(notifyComponent.getElement()).to.have.class('notify');
    });
});

describe("ProfileGroupTextComponent", () => {
    const field = new FormField('text', 'email', 'Почта', 'Некорректное значение', 'email', 'test@test.com');
    const profileGroupTextComponent = new ProfileGroupTextComponent({ "root": field }, templator);

    it("Test ProfileGroupInputComponent", () => {
        chai.expect(profileGroupTextComponent.getElement()).to.have.class('profile__group');
    });
});

describe("ProfileGroupInputComponent", () => {
    const field = new FormField('password', 'oldPassword', 'Старый пароль', 'Некорректное значение', 'password', '');
    const profileGroupInputComponent = new ProfileGroupInputComponent({ "root": field }, templator);

    it("Test ProfileGroupInputComponent", () => {
        chai.expect(profileGroupInputComponent.getElement()).to.have.class('profile__group');
    });
});

describe("TextLinkComponent", () => {
    const textLink = new TextLink('text', 'class', 'path');
    const textLinkComponent = new TextLinkComponent({ "root": textLink }, templator);

    it("Test TextLinkComponent", () => {
        chai.expect(textLinkComponent.getElement()).to.have.class('text-link');
    });
});