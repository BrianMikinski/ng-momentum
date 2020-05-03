import {
    Rule,
    SchematicContext,
    Tree,
    apply,
    chain,
    mergeWith,
    template,
    url,
    move,
    filter,
    noop,
    schematic,
    MergeStrategy,
    forEach,
    FileEntry,
} from '@angular-devkit/schematics';
import {join} from '@angular-devkit/core';
import {strings} from '../utils/strings';
import {Schema as ServiceOptions} from './schema';
import {Schema as VoOptions} from '../vo/schema';
import {setupOptions} from '../utils/setup';
import {constants} from '../utils/constants';

/**
 * Creates a Service.
 * @param {Schema} options
 * @returns {Rule}
 */
export function service(options: ServiceOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        setupOptions(host, options);
        // defaults
        options.operations = (options.operations) ? options.operations : 'clrud';
        options.endpoint = (options.endpoint) ? options.endpoint : strings.dasherize(options.name);
        options.vo = (options.vo) ? options.vo : options.name;
        options.voPath = (options.voPath) ? options.voPath : join(options.path, constants.voFolder, strings.dasherize(strings.singularize(options.vo)));

        // create vo options
        const voOptions: VoOptions = {
            project: options.project,
            path: options.path,
            name: options.vo,
            spec: options.spec,
            obj: options.obj
        };

        const movePath = (options.flat) ?
            join(options.path, constants.servicesFolder) :
            join(options.path, constants.servicesFolder, strings.dasherize(strings.pluralize(options.name))
            );

        // get template source
        const templateSource = apply(url('./files'), [
            options.spec ? noop() : filter(path => !path.endsWith(constants.specFileExtension)),
            template({
                ...strings,
                'if-flat': (s: string) => options.flat ? '' : s,
                ...options,
            }),
            move(movePath),
             // fix for bug
            // https://stackoverflow.com/questions/48957132/how-to-overwrite-file-with-angular-schematics
            forEach((fileEntry: FileEntry) => {
                if (host.exists(fileEntry.path)) {
                    host.overwrite(fileEntry.path, fileEntry.content);
                  return null;
                }
                return fileEntry;
              }),
        ]);

        const rule = chain([
            options.skipVo ? noop() : schematic(constants.voSchematic, voOptions),
            mergeWith(templateSource, MergeStrategy.Default)
        ]);
        return rule(host, context);
    };
}