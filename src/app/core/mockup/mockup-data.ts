import { PropsComponent } from '../../shared/interfaces/props-component.js';
import { NavItem } from '../../shared/interfaces/nav-item.js';

export class MockupData implements PropsComponent {
    public navItems: NavItem[];

    constructor() {
        this.navItems = [];
    }
}