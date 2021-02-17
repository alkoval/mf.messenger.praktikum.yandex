import { ComponentConstructor } from "./component-contstructor"

export interface NavItem {
    text: string;
    icon: string;
    path: string;
    component: ComponentConstructor,
    guard: string | null
}
