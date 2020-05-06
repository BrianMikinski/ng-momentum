import { Tree } from "@angular-devkit/schematics";
export interface NodeNameType {
    name: string;
    type: string;
}
export declare function getVoProperties(host: Tree, path: string, name: string): string[];
