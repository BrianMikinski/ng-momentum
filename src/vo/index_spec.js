"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const testing_1 = require("@angular-devkit/schematics/testing");
const path = require("path");
const schema_1 = require("@schematics/angular/application/schema");
// SchematicTestRunner needs an absolute path to the collection to test.
const collectionPath = path.join(__dirname, '../collection.json');
describe('vo', () => {
    const schematicRunner = new testing_1.SchematicTestRunner('@schematics/angular', path.join(__dirname, '..', '..', 'node_modules', '@schematics', 'angular', 'collection.json'));
    const customRunner = new testing_1.SchematicTestRunner('momentum', path.join(__dirname, '..', 'collection.json'));
    const workspaceOptions = {
        name: 'workspace',
        newProjectRoot: 'projects',
        version: '9.1.1',
    };
    describe('with project', () => {
        const appOptions = {
            name: 'bar',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: schema_1.Style.Css,
            skipTests: false,
            skipPackageJson: false,
        };
        let appTree;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            appTree = yield schematicRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions)
                .toPromise();
            appTree = yield schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree)
                .toPromise();
            appTree = yield customRunner.runExternalSchematicAsync('momentum', 'scaffold', {
                spec: true
            }, appTree)
                .toPromise();
        }));
        it('requires required option', () => {
            // We test that
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('vo', {}, appTree)).toThrow();
        });
        it('fails without app tree', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('vo', {}, schematics_1.Tree.empty())).toThrow();
        });
        it('works', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('vo', {
                name: 'test'
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
        }));
        it('works with rename', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('vo', {
                name: 'tests'
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
        }));
        it('works without tests', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('vo', {
                name: 'test',
                spec: false
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
        }));
        it('do not allow overwrite', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('vo', {
                name: 'test',
                obj: '{"id":"number"}',
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree.readContent('/projects/bar/src/app/vos/test/test.ts').indexOf('title')).toBe(-1);
            expect(tree.readContent('/projects/bar/src/app/vos/test/test.spec.ts').indexOf('title')).toBe(-1);
            const tree2 = yield runner.runSchematicAsync('vo', {
                name: 'test',
            }, tree).toPromise();
            // Listing files
            expect(tree2.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree2.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree2.readContent('/projects/bar/src/app/vos/test/test.ts').indexOf('title')).toBe(-1);
            expect(tree2.readContent('/projects/bar/src/app/vos/test/test.spec.ts').indexOf('title')).toBe(-1);
        }));
        it('does allow overwrite', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('vo', {
                name: 'test',
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            const tree2 = yield runner.runSchematicAsync('vo', {
                name: 'test',
                obj: '{"id":"number"}',
            }, tree).toPromise();
            // Listing files
            expect(tree2.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree2.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree2.readContent('/projects/bar/src/app/vos/test.ts').indexOf('title')).toBe(-1);
        }));
    });
    describe('without project', () => {
        const appOptions = {
            name: 'bar',
            projectRoot: '',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: schema_1.Style.Css,
            skipTests: false,
            skipPackageJson: false,
        };
        let appTree;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            appTree = yield schematicRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions).toPromise();
            appTree = yield schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree).toPromise();
            appTree = yield customRunner.runExternalSchematicAsync('momentum', 'scaffold', {
                spec: true
            }, appTree).toPromise();
        }));
        it('requires required option', () => {
            // We test that
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('vo', {}, appTree)).toThrow();
        });
        it('fails without app tree', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('vo', {}, schematics_1.Tree.empty())).toThrow();
        });
        it('works', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('vo', {
                name: 'test',
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
        }));
        it('works without tests', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('vo', {
                name: 'test',
                spec: false
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);
        }));
        it('do not allow overwrite', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('vo', {
                name: 'test',
                obj: '{"id":"number"}',
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree.readContent('/src/app/vos/test/test.ts').indexOf('title')).toBe(-1);
            expect(tree.readContent('/src/app/vos/test/test.spec.ts').indexOf('title')).toBe(-1);
            const tree2 = yield runner.runSchematicAsync('vo', {
                name: 'test',
            }, tree).toPromise();
            // Listing files
            expect(tree2.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree2.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree2.readContent('/src/app/vos/test/test.ts').indexOf('title')).toBe(-1);
            expect(tree2.readContent('/src/app/vos/test/test.spec.ts').indexOf('title')).toBe(-1);
        }));
        xit('does allow overwrite', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('vo', {
                name: 'test',
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            const tree2 = yield runner.runSchematicAsync('vo', {
                name: 'test',
                obj: '{"id":"number"}',
            }, tree).toPromise();
            // Listing files
            expect(tree2.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree2.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree2.readContent('/src/app/vos/test/test.ts').indexOf('title')).toBe(-1);
        }));
    });
});
//# sourceMappingURL=index_spec.js.map