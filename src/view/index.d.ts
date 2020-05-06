import { Rule } from '@angular-devkit/schematics';
import { Schema as ViewOptions } from './schema';
export declare enum VIEW_OPTION {
    Blank = "blank",
    List = "list",
    DETAILS = "details",
    FORM = "form",
    TABLE = "table"
}
export declare const VIEW_OPTIONS: VIEW_OPTION[];
/**
 * Creates a Service.
 * @param {Schema} options
 * @returns {Rule}
 */
export declare function view(options: ViewOptions): Rule;
