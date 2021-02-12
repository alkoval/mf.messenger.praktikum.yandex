import { ComponentConstructor } from "./component-contstructor.js";

export interface NavItem {
    text: string;
    icon: string;
    path: string;
    component: ComponentConstructor
}
