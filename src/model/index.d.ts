import { Rule } from '@angular-devkit/schematics';
import { Schema as ModelOptions } from './schema';
export declare enum MODEL_OPTION {
    Blank = "blank",
    List = "list",
    Selected = "selected"
}
export declare const MODEL_OPTIONS: MODEL_OPTION[];
/**
 * Creates a Service.
 * @param {Schema} options
 * @returns {Rule}
 */
export declare function model(options: ModelOptions): Rule;
