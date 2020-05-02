import {Tree} from '@angular-devkit/schematics';
import {SchematicTestRunner, UnitTestTree} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import {Schema as ApplicationOptions, Style} from '@schematics/angular/application/schema';
import {Schema as WorkspaceOptions} from '@schematics/angular/workspace/schema';

// SchematicTestRunner needs an absolute path to the collection to test.
const collectionPath = path.join(__dirname, '../collection.json');

describe('model', () => {

    const schematicRunner = new SchematicTestRunner(
        '@schematics/angular',
        path.join(__dirname, '..', '..', 'node_modules', '@schematics', 'angular', 'collection.json')
    );

    const customRunner = new SchematicTestRunner(
        'momentum',
        path.join(__dirname, '..', 'collection.json')
    );

    const workspaceOptions: WorkspaceOptions = {
        name: 'workspace',
        newProjectRoot: 'projects',
        version: '9.1.1',
    };

    describe('with project', () => {

        const appOptions: ApplicationOptions = {
            name: 'bar',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: Style.Css,
            skipTests: false,
            skipPackageJson: false,
        };

        let appTree: UnitTestTree;
        beforeEach( async () => {
            await schematicRunner.runExternalSchematicAsync('@schematics/angular','workspace', workspaceOptions)
            .toPromise().then(tree => {
                appTree = tree;
            });
            await schematicRunner.runExternalSchematicAsync('@schematics/angular','application', appOptions, appTree)
            .toPromise().then(tree => {
                appTree = tree;
            });
            await customRunner.runExternalSchematicAsync('momentum', 'scaffold', {
                spec: true
            }, appTree).toPromise().then(tree => {
                appTree = tree;
            });
        });

        it('requires required option', () => {
            // We test that
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('model', {}, appTree)).toThrow();
        });

        it('fails without app tree', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('model', {}, Tree.empty())).toThrow();
        });

        it('blank works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            
            const tree = await runner.runSchematicAsync('model', {
                name: 'test'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.spec.ts')).toBeGreaterThanOrEqual(0);
        });

        it('blank works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('model', {
                name: 'test',
                spec: false
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.spec.ts')).toBe(-1);
        });

        it('list works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('model', {
                name: 'test',
                template: 'list'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/models/tests/tests.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/models/tests/tests.model.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.spec.ts')).toBeGreaterThanOrEqual(0);
        });

        it('list works without tests', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            let tree: UnitTestTree;
            
            runner.runSchematicAsync('model', {
                name: 'test',
                template: 'list',
                spec: false
            }, appTree).toPromise().then( value => {
                tree = value;
            });

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/models/tests/tests.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/models/tests/tests.model.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.spec.ts')).toBe(-1);
        });

        it('selected works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('model', {
                name: 'test',
                template: 'selected'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.spec.ts')).toBeGreaterThanOrEqual(0);
        });

        it('selected works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('model', {
                name: 'test',
                template: 'selected',
                spec: false
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.spec.ts')).toBe(-1);
        });

    });

    describe('without project', () => {

        const appOptions: ApplicationOptions = {
            name: 'bar',
            projectRoot: '',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: Style.Css,
            skipTests: false,
            skipPackageJson: false,
        };

        let appTree: UnitTestTree;
        beforeEach(async () => {
            appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions)
            .toPromise();
            
            appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree)
            .toPromise();
            
            appTree = await customRunner.runExternalSchematicAsync('momentum', 'scaffold', {
                spec: true
            }, appTree).toPromise();
        });

        it('requires required option', () => {
            // We test that
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('model', {}, appTree)).toThrow();
        });

        it('fails without app tree', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('model', {}, Tree.empty())).toThrow();
        });

        it('blank works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('model', {
                name: 'test'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/test/test.model.spec.ts')).toBeGreaterThanOrEqual(0);
        });

        it('blank works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('model', {
                name: 'test',
                spec: false
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/test/test.model.spec.ts')).toBe(-1);
        });

        it('list works', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            let tree: UnitTestTree;
            
            runner.runSchematicAsync('model', {
                name: 'test',
                template: 'list'
            }, appTree).toPromise().then(value => {
                tree = value;
            });

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/src/app/models/tests/tests.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/tests/tests.model.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.spec.ts')).toBeGreaterThanOrEqual(0);
        });

        it('list works without tests', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            let tree: UnitTestTree;
            
            runner.runSchematicAsync('model', {
                name: 'test',
                template: 'list',
                spec: false
            }, appTree).toPromise().then(value => {
                tree = value;
            });

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/src/app/models/tests/tests.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/tests/tests.model.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.spec.ts')).toBe(-1);
        });

        it('selected works', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            let tree: UnitTestTree;
            
            runner.runSchematicAsync('model', {
                name: 'test',
                template: 'selected'
            }, appTree).toPromise().then(value => {
                tree = value;
            });

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/test/test.model.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.spec.ts')).toBeGreaterThanOrEqual(0);
        });

        it('selected works without tests', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            let tree: UnitTestTree;
            
            runner.runSchematicAsync('model', {
                name: 'test',
                template: 'selected',
                spec: false
            }, appTree).toPromise().then(value => {
                tree = value;
            });

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/test/test.model.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.spec.ts')).toBe(-1);
        });

    });
});
