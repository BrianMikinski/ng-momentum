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
const sinon = require("sinon");
const fetch = require("node-fetch");
// SchematicTestRunner needs an absolute path to the collection to test.
const collectionPath = path.join(__dirname, '../collection.json');
describe('crud', () => {
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
            style: schema_1.Style.Scss,
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
                spec: true,
            }, appTree)
                .toPromise();
        }));
        it('requires required option', () => {
            // We test that
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('crud', {}, appTree)).toThrow();
        });
        it('fails without app tree', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('crud', {}, schematics_1.Tree.empty())).toThrow();
        });
        it('works', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            //let tree: UnitTestTree;
            const tree = yield runner.runSchematicAsync('crud', {
                name: 'test'
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.readContent('/projects/bar/src/app/services/tests/tests.service.ts').indexOf('import { Test } from \'src/app/vos/test/test\';')).toBeGreaterThanOrEqual(0);
            expect(tree.readContent('/projects/bar/src/app/services/tests/tests.service.spec.ts').indexOf('import { Test } from \'src/app/vos/test/test\';')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        }));
        it('works without tests', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('crud', {
                name: 'test',
                spec: false
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        }));
    });
    describe('without project', () => {
        const appOptions = {
            name: 'bar',
            projectRoot: '',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: schema_1.Style.Scss,
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
                spec: true,
            }, appTree)
                .toPromise();
        }));
        it('requires required option', () => {
            // We test that
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('crud', {}, appTree)).toThrow();
        });
        it('fails without app tree', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('crud', {}, schematics_1.Tree.empty())).toThrow();
        });
        it('works', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('crud', {
                name: 'test'
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.edit.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.edit.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.edit.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.edit.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.edit.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.edit.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/tests.list.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/tests.list.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/tests.list.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/tests.list.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/tests.list.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/tests.list.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.new.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.new.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.new.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.new.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.new.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.new.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.details.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.details.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.details.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.details.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.details.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.details.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        }));
        it('works without tests', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('crud', {
                name: 'test',
                spec: false
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.edit.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.edit.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.edit.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.edit.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.edit.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.edit.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/tests.list.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/tests.list.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/tests.list.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/tests.list.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/tests.list.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/tests.list.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.new.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.new.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.new.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.new.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.new.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.new.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.details.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.details.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.details.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.details.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.details.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.details.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        }));
    });
    describe('with url and single object', () => {
        const appOptions = {
            name: 'bar',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: schema_1.Style.Scss,
            skipTests: false,
            skipPackageJson: false,
        };
        let appTree, sandbox;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            appTree = yield schematicRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions)
                .toPromise();
            appTree = yield schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree)
                .toPromise();
            appTree = yield customRunner.runExternalSchematicAsync('momentum', 'scaffold', {
                spec: true,
                style: 'scss'
            }, appTree)
                .toPromise();
            sandbox = sinon.createSandbox();
            sandbox.stub(fetch, 'Promise').returns(Promise.resolve({
                json: function () {
                    return { "a": "1", "b": 2, "c": true };
                }
            }));
        }));
        afterEach(() => {
            sandbox.restore();
        });
        it('requires required option', () => {
            // We test that
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('crud', {}, appTree)).toThrow();
        });
        it('fails without app tree', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('crud', {}, schematics_1.Tree.empty())).toThrow();
        });
        it('works', (done) => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            runner.runSchematicAsync('crud', {
                name: 'test',
                url: 'http://localhost:8080/my-endpoint/'
            }, appTree).subscribe(tree => {
                // Listing files
                expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.spec.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.component.scss')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.component.html')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.component.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.component.spec.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.guard.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.guard.spec.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.component.scss')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.component.html')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.component.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.component.spec.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.guard.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.guard.spec.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.component.scss')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.component.html')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.component.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.component.spec.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.guard.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.guard.spec.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.component.scss')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.component.html')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.component.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.component.spec.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.guard.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.guard.spec.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
                done();
            });
        });
        it('works without tests', (done) => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            runner.runSchematicAsync('crud', {
                name: 'test',
                spec: false,
                url: 'http://localhost:8080/my-endpoint/'
            }, appTree).subscribe(tree => {
                // Listing files
                expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
                expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.spec.ts')).toBe(-1);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.component.scss')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.component.html')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.component.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.component.spec.ts')).toBe(-1);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.guard.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.edit.guard.spec.ts')).toBe(-1);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.component.scss')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.component.html')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.component.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.component.spec.ts')).toBe(-1);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.guard.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/tests.list.guard.spec.ts')).toBe(-1);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.component.scss')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.component.html')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.component.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.component.spec.ts')).toBe(-1);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.guard.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.new.guard.spec.ts')).toBe(-1);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.component.scss')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.component.html')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.component.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.component.spec.ts')).toBe(-1);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.guard.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.details.guard.spec.ts')).toBe(-1);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
                expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
                done();
            });
        });
    });
});
//# sourceMappingURL=index_spec.js.map