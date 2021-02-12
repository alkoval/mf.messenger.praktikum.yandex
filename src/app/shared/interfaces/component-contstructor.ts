import { Templator } from "../../core/core";
import { Component } from "./component";
import { PropsComponent } from "./props-component";

export interface ComponentConstructor {
    new(props: PropsComponent, templator: Templator): Component;
}