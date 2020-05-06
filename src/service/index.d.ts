import { Rule } from '@angular-devkit/schematics';
import { Schema as ServiceOptions } from './schema';
/**
 * Creates a Service.
 * @param {Schema} options
 * @returns {Rule}
 */
export declare function service(options: ServiceOptions): Rule;
