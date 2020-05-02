import {Tree} from '@angular-devkit/schematics';
import {SchematicTestRunner, UnitTestTree} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import {Schema as ApplicationOptions, Style} from '@schematics/angular/application/schema';
import {Schema as WorkspaceOptions} from '@schematics/angular/workspace/schema';

// SchematicTestRunner needs an absolute path to the collection to test.
const collectionPath = path.join(__dirname, '../collection.json');

describe('view', () => {

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
            style: Style.Scss,
            skipTests: false,
            skipPackageJson: false,
        };

        let appTree: UnitTestTree;
        beforeEach(async () => {
            appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions).toPromise();
            appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree).toPromise();
            appTree = await customRunner.runExternalSchematicAsync('momentum','scaffold', {
                spec: true
            }, appTree).toPromise();
        });

        it('requires required option', () => {
            // We test that
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('view', {}, appTree)).toThrow();
        });

        it('fails without app tree', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('view', {}, Tree.empty())).toThrow();
        });

        it('blank works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test'
            }, appTree).toPromise();

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('blank works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                spec: false
            }, appTree).toPromise();

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('details works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'details'
            }, appTree).toPromise();

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('details works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'details',
                spec: false
            }, appTree).toPromise();

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('form works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'form'
            }, appTree).toPromise();

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('form works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'form',
                spec: false
            }, appTree).toPromise();

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('list works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'list'
            }, appTree).toPromise();

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('list works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'list',
                spec: false
            }, appTree).toPromise();

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('table works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'table'
            }, appTree).toPromise() ;

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('table works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'table',
                spec: false
            }, appTree).toPromise() ;

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

    });

    describe('with eager loading', () => {

        const appOptions: ApplicationOptions = {
            name: 'bar',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: Style.Scss,
            skipTests: false,
            skipPackageJson: false,
        };

        let appTree: UnitTestTree;
        beforeEach(async () => {
            appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions).toPromise();
            appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree).toPromise();
            appTree = await customRunner.runExternalSchematicAsync('momentum','scaffold', {
                spec: true
            }, appTree).toPromise();
        });

        it('requires required option', () => {
            // We test that
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect( () => runner.runSchematic('view', {}, appTree)).toThrow();
        });

        it('fails without app tree', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect( () => runner.runSchematic('view', {}, Tree.empty())).toThrow();
        });

        it('blank works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                eager: true
            }, appTree).toPromise() ;

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBe(-1);

            //console.debug(tree.readContent('/projects/bar/src/app/core/core.module.ts'));

            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf(
                "import { TestModule } from '../test/test.module';"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('blank works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                spec: false,
                eager: true
            }, appTree).toPromise();

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBe(-1);

            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf(
                "import { TestModule } from '../test/test.module';"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('details works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'details',
                eager: true
            }, appTree).toPromise() ;

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBe(-1);

            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf(
                "import { TestModule } from '../test/test.module';"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('details works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'details',
                spec: false,
                eager: true
            }, appTree).toPromise() ;

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBe(-1);

            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf(
                "import { TestModule } from '../test/test.module';"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('form works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'form',
                eager: true
            }, appTree).toPromise() ;

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBe(-1);

            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf(
                "import { TestModule } from '../test/test.module';"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('form works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'form',
                spec: false,
                eager: true
            }, appTree).toPromise() ; 

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBe(-1);

            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf(
                "import { TestModule } from '../test/test.module';"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('list works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'list',
                eager: true
            }, appTree).toPromise() ;

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBe(-1);

            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf(
                "import { TestModule } from '../test/test.module';"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('list works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'list',
                spec: false,
                eager: true
            }, appTree).toPromise() ;

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBe(-1);

            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf(
                "import { TestModule } from '../test/test.module';"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('table works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'table',
                eager: true
            }, appTree).toPromise() ;

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBe(-1);

            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf(
                "import { TestModule } from '../test/test.module';"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('table works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'table',
                spec: false,
                eager: true
            }, appTree).toPromise();

            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf(
                "{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},"
            )).toBe(-1);

            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf(
                "import { TestModule } from '../test/test.module';"
            )).toBeGreaterThanOrEqual(0);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

    });

    describe('with existing vo', () => {

        const appOptions: ApplicationOptions = {
            name: 'bar',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: Style.Scss,
            skipTests: false,
            skipPackageJson: false,
        };

        let appTree: UnitTestTree;
        beforeEach(async () => {
            appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular','workspace', workspaceOptions).toPromise();
            appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree).toPromise();
            appTree = await customRunner.runExternalSchematicAsync('momentum', 'scaffold', {
                spec: true
            }, appTree).toPromise();

            appTree = await customRunner.runExternalSchematicAsync('momentum', 'vo', {
                name: 'custom vo',
                obj: '{"id":"number", "customName": "string"}',
            }, appTree).toPromise();
        });

        it('requires required option', () => {
            // We test that
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect( () => runner.runSchematic('view', {}, appTree)).toThrow();
        });

        it('fails without app tree', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect( () => runner.runSchematic('view', {}, Tree.empty())).toThrow();
        });

        it('blank works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                vo: 'custom vo'
            }, appTree).toPromise() ;

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('blank works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                spec: false,
                vo: 'custom vo'
            }, appTree).toPromise() ;

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('details works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'details',
                vo: 'custom vo'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('details works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'details',
                spec: false,
                vo: 'custom vo'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('form works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'form',
                vo: 'custom vo'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('form works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'form',
                spec: false,
                vo: 'custom vo'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('list works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'list',
                vo: 'custom vo'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('list works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'list',
                spec: false,
                vo: 'custom vo'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('table works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'table',
                vo: 'custom vo'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('table works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'table',
                spec: false,
                vo: 'custom vo'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

    });

    describe('without project', () => {

        const appOptions: ApplicationOptions = {
            name: 'bar',
            projectRoot: '',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: Style.Scss,
            skipTests: false,
            skipPackageJson: false,
        };

        let appTree: UnitTestTree;

        beforeEach(async () => {
            appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions)
                .toPromise();
            appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree).
                toPromise();
            appTree = await customRunner.runExternalSchematicAsync('momentum', 'scaffold', {
                spec: true
            }, appTree).toPromise();
        });

        it('requires required option', () => {
            // We test that
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect( () => runner.runSchematic('view', {}, appTree)).toThrow();
        });

        it('fails without app tree', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect( () => runner.runSchematic('view', {}, Tree.empty())).toThrow();
        });

        it('blank works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('blank works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                spec: false
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('details works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'details'
            }, appTree).toPromise(); 

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('details works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'details',
                spec: false
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('form works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'form'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('form works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'form',
                spec: false
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('list works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'list'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('list works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'list',
                spec: false
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('table works', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'table'
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

        it('table works without tests', async () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = await runner.runSchematicAsync('view', {
                name: 'test',
                template: 'table',
                spec: false
            }, appTree).toPromise();

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });

    });
});
