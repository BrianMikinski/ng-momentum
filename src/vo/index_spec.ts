import {Tree} from '@angular-devkit/schematics';
import {SchematicTestRunner, UnitTestTree} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import {Schema as ApplicationOptions, Style} from '@schematics/angular/application/schema';
import {Schema as WorkspaceOptions} from '@schematics/angular/workspace/schema';

// SchematicTestRunner needs an absolute path to the collection to test.
const collectionPath = path.join(__dirname, '../collection.json');

describe('vo', () => {

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
            appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular','workspace', workspaceOptions)
                .toPromise();
            appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree)
                .toPromise();

            appTree = await customRunner.runExternalSchematicAsync('momentum', 'scaffold', {
                spec: true
            }, appTree)
                .toPromise();
        });

        it('requires required option', () => {
            // We test that
            const runner = new SchematicTestRunner('momentum', collectionPath);

            expect( () => runner.runSchematic('vo', {}, appTree)).toThrow();
        });

        it('fails without app tree', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('vo', {}, Tree.empty())).toThrow();
        });

        it('works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('vo', {
                name: 'test'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
        });

        it('works with rename', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('vo', {
                name: 'tests'
            }, appTree).toPromise() ;

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
        });

        it('works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('vo', {
                name: 'test',
                spec: false
            }, appTree).toPromise() ;

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
        });

        it('do not allow overwrite', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('vo', {
                name: 'test',
                obj: '{"id":"number"}',
            }, appTree).toPromise() ;

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree.readContent('/projects/bar/src/app/vos/test/test.ts').indexOf('title')).toBe(-1);
            expect(tree.readContent('/projects/bar/src/app/vos/test/test.spec.ts').indexOf('title')).toBe(-1);

            const tree2 = await  runner.runSchematicAsync('vo', {
                name: 'test',
            }, tree).toPromise();

            // Listing files
            expect(tree2.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree2.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree2.readContent('/projects/bar/src/app/vos/test/test.ts').indexOf('title')).toBe(-1);
            expect(tree2.readContent('/projects/bar/src/app/vos/test/test.spec.ts').indexOf('title')).toBe(-1);
        });

        it('does allow overwrite', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('vo', {
                name: 'test',
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            const tree2 = await runner.runSchematicAsync('vo', {
                name: 'test',
                obj: '{"id":"number"}',
            }, tree).toPromise();

            // Listing files
            expect(tree2.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree2.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree2.readContent('/projects/bar/src/app/vos/test.ts').indexOf('title')).toBe(-1);
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
            appTree = await schematicRunner.runExternalSchematicAsync( '@schematics/angular','workspace', workspaceOptions).toPromise();
            appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree).toPromise();
            appTree = await customRunner.runExternalSchematicAsync('momentum', 'scaffold', {
                spec: true
            }, appTree).toPromise();
        });

        it('requires required option', () => {
            // We test that
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('vo', {}, appTree)).toThrow();
        });

        it('fails without app tree', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('vo', {}, Tree.empty())).toThrow();
        });

        it('works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('vo', {
                name: 'test',
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
        });

        it('works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('vo', {
                name: 'test',
                spec: false
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);
        });

        it('do not allow overwrite', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('vo', {
                name: 'test',
                obj: '{"id":"number"}',
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree.readContent('/src/app/vos/test/test.ts').indexOf('title')).toBe(-1);
            expect(tree.readContent('/src/app/vos/test/test.spec.ts').indexOf('title')).toBe(-1);

            const tree2 = await runner.runSchematicAsync('vo', {
                name: 'test',
            }, tree).toPromise();

            // Listing files
            expect(tree2.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree2.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree2.readContent('/src/app/vos/test/test.ts').indexOf('title')).toBe(-1);
            expect(tree2.readContent('/src/app/vos/test/test.spec.ts').indexOf('title')).toBe(-1);
        });

        xit('does allow overwrite', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('vo', {
                name: 'test',
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            const tree2 = await runner.runSchematicAsync('vo', {
                name: 'test',
                obj: '{"id":"number"}',
            }, tree).toPromise();

            // Listing files
            expect(tree2.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree2.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree2.readContent('/src/app/vos/test/test.ts').indexOf('title')).toBe(-1);
        });

    });
});
