import { Rule } from '@angular-devkit/schematics';
import { Schema as ScaffoldOptions } from './schema';
export declare enum UI_FRAMEWORK_OPTION {
    BASIC = "basic",
    MATERIAL = "material",
    BOOTSTRAP = "bootstrap"
}
export declare const UI_FRAMEWORK_OPTIONS: UI_FRAMEWORK_OPTION[];
export declare function scaffold(options: ScaffoldOptions): Rule;
