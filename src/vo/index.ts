import {
    Rule,
    SchematicContext,
    Tree,
    apply,
    chain,
    template,
    url, move,
    noop,
    filter,
    mergeWith,
    MergeStrategy, 
    FileEntry, forEach,
} from '@angular-devkit/schematics';
import {join} from '@angular-devkit/core';
import {strings} from '../utils/strings';
import {Schema as VoOptions} from './schema';
import {setupOptions} from '../utils/setup';
import {constants} from '../utils/constants';

/**
 * Creates a Value Object.
 * @param {Schema} options
 * @returns {Rule}
 */
export function vo(options: VoOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        setupOptions(host, options);

        const movePath = (options.flat) ?
            join(options.path, constants.voFolder) :
            join(options.path, constants.voFolder, strings.dasherize(
                strings.singularize(options.name)
            ));
        // get template source
        const templateSource = apply(url('./files'), [
            options.spec ? noop() : filter(path => !path.endsWith(constants.specFileExtension)),
            template({
                ...strings,
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
            mergeWith(templateSource, MergeStrategy.Default)
        ]);
        return rule(host, context);
    };
}