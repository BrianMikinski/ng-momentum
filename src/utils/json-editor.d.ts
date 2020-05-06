import { JsonArray, JsonObject } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
export interface NodeKeyValue {
    key: string;
    value: string | boolean | number;
}
export declare function addScriptIntoPackageJson(host: Tree, script: NodeKeyValue): Tree;
export declare function readValueFromAngularJsonBuildProjects(tree: Tree, key: string): string | number | boolean | JsonObject | JsonArray;
export declare function readValueFromJsonFile(tree: Tree, path: string, key: string): string;
export declare function addValueIntoAngularJsonBuildProjects(host: Tree, keyValue: NodeKeyValue): Tree;
