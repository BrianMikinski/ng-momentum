import { Tree } from '@angular-devkit/schematics';
import { Schema as HasImportOptions } from './has-import-schema';
import { Schema as BaseOptions } from './schema';
import * as ts from 'typescript';
import { Path } from "@angular-devkit/core";
export declare function addImportToFile(host: Tree, addContent: string, path: string): Tree;
export declare function addRouteToAppRoutingModule(host: Tree, options: HasImportOptions & BaseOptions): Tree;
export declare function addImportToNgModule(host: Tree, options: HasImportOptions & BaseOptions, classifiedName: string): Tree;
export declare function addDeclarationToNgModule(host: Tree, options: HasImportOptions & BaseOptions, classifiedName: string): Tree;
export declare function findNodes(node: ts.Node, kind: ts.SyntaxKind, max?: number): ts.Node[];
export interface ModuleOptions {
    module?: string;
    name: string;
    flat?: boolean;
    path?: string;
    skipImport?: boolean;
}
/**
 * Find the module referred by a set of options passed to the schematics.
 */
export declare function findRoutingModuleFromOptions(host: Tree, options: ModuleOptions): Path | undefined;
/**
 * Function to find the "closest" module to a generated file's path.
 */
export declare function findRoutingModule(host: Tree, generateDir: string): Path;
