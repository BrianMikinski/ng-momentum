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
describe('model', () => {
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
            yield schematicRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions)
                .toPromise().then(tree => {
                appTree = tree;
            });
            yield schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree)
                .toPromise().then(tree => {
                appTree = tree;
            });
            yield customRunner.runExternalSchematicAsync('momentum', 'scaffold', {
                spec: true
            }, appTree).toPromise().then(tree => {
                appTree = tree;
            });
        }));
        it('requires required option', () => {
            // We test that
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('model', {}, appTree)).toThrow();
        });
        it('fails without app tree', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('model', {}, schematics_1.Tree.empty())).toThrow();
        });
        it('blank works', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('model', {
                name: 'test'
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.spec.ts')).toBeGreaterThanOrEqual(0);
        }));
        it('blank works without tests', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('model', {
                name: 'test',
                spec: false
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.spec.ts')).toBe(-1);
        }));
        it('list works', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('model', {
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
        }));
        it('list works without tests', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            let tree = yield runner.runSchematicAsync('model', {
                name: 'test',
                template: 'list',
                spec: false
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/models/tests/tests.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/models/tests/tests.model.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.spec.ts')).toBe(-1);
        }));
        it('selected works', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('model', {
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
        }));
        it('selected works without tests', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('model', {
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
            appTree = yield schematicRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions)
                .toPromise();
            appTree = yield schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree)
                .toPromise();
            appTree = yield customRunner.runExternalSchematicAsync('momentum', 'scaffold', {
                spec: true
            }, appTree).toPromise();
        }));
        it('requires required option', () => {
            // We test that
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('model', {}, appTree)).toThrow();
        });
        it('fails without app tree', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('model', {}, schematics_1.Tree.empty())).toThrow();
        });
        it('blank works', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('model', {
                name: 'test'
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/test/test.model.spec.ts')).toBeGreaterThanOrEqual(0);
        }));
        it('blank works without tests', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('model', {
                name: 'test',
                spec: false
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/test/test.model.spec.ts')).toBe(-1);
        }));
        it('list works', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            let tree = yield runner.runSchematicAsync('model', {
                name: 'test',
                template: 'list'
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/tests/tests.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/tests/tests.model.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.spec.ts')).toBeGreaterThanOrEqual(0);
        }));
        it('list works without tests', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            let tree = yield runner.runSchematicAsync('model', {
                name: 'test',
                template: 'list',
                spec: false
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/models/tests/tests.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/tests/tests.model.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.spec.ts')).toBe(-1);
        }));
        it('selected works', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            let tree;
            tree = yield runner.runSchematicAsync('model', {
                name: 'test',
                template: 'selected'
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/test/test.model.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.spec.ts')).toBeGreaterThanOrEqual(0);
        }));
        it('selected works without tests', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            let tree = yield runner.runSchematicAsync('model', {
                name: 'test',
                template: 'selected',
                spec: false
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/test/test.model.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.spec.ts')).toBe(-1);
        }));
    });
});
//# sourceMappingURL=index_spec.js.map