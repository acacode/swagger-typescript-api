import * as _ from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { ValuesType } from "utility-types";
import { CallbackContainer } from "./components/CallbackContainer";
import { SecuritySchemeContainer } from "./components/SecuritySchemeContainer";
import { SchemaContainer } from "./components/SchemaContainer";
import { ResponseContainer } from "./components/ResponseContainer";
import { RequestBodyContainer } from "./components/RequestBodyContainer";
import { ParameterContainer } from "./components/ParameterContainer";
import { LinkContainer } from "./components/LinkContainer";
import { HeaderContainer } from "./components/HeaderContainer";
import { ExampleContainer } from "./components/ExampleContainer";
import { Component } from "./Component";

type ExtractedComponentsObject = {
  [K in keyof OpenAPIV3.ComponentsObject]: Record<
    string,
    Exclude<ValuesType<OpenAPIV3.ComponentsObject[K]>, OpenAPIV3.ReferenceObject>
  >;
};

const componentsContainers: Record<
  keyof ExtractedComponentsObject,
  new (...args: unknown[]) => Component<any>
> = {
  callbacks: CallbackContainer,
  examples: ExampleContainer,
  headers: HeaderContainer,
  links: LinkContainer,
  parameters: ParameterContainer,
  requestBodies: RequestBodyContainer,
  responses: ResponseContainer,
  schemas: SchemaContainer,
  securitySchemes: SecuritySchemeContainer,
};

export class Components {
  callbacks: Record<string, CallbackContainer> = {};
  examples: Record<string, ExampleContainer> = {};
  headers: Record<string, HeaderContainer> = {};
  links: Record<string, LinkContainer> = {};
  parameters: Record<string, ParameterContainer> = {};
  requestBodies: Record<string, RequestBodyContainer> = {};
  responses: Record<string, ResponseContainer> = {};
  schemas: Record<string, SchemaContainer> = {};
  securitySchemes: Record<string, SecuritySchemeContainer> = {};

  constructor(componentsObject: OpenAPIV3.ComponentsObject) {
    _.each(componentsObject, (componentMap, componentName) => {
      const Constructor = componentsContainers[componentName];

      _.each(componentMap, (componentPart, componentPartName) => {
        this[componentName][componentPartName] = new Constructor(componentPart);
      });
    });
  }
}
