import { Rule } from '@angular-devkit/schematics';
import { Schema as CrudOptions } from './schema';
/**
 * Creates a Service.
 * @param {Schema} options
 * @returns {Rule}
 */
export declare function crud(options: CrudOptions): Rule;
