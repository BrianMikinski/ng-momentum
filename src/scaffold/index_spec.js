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
describe('scaffold', () => {
    const schematicRunner = new testing_1.SchematicTestRunner('@schematics/angular', path.join(__dirname, '..', '..', 'node_modules', '@schematics', 'angular', 'collection.json'));
    describe('with project', () => {
        const workspaceOptions = {
            name: 'workspace',
            newProjectRoot: 'projects',
            version: '9.1.1',
        };
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
        }));
        it('fails without app tree', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('scaffold', {}, schematics_1.Tree.empty())).toThrow();
        });
        it('works with tests', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('scaffold', {
                project: 'bar',
                spec: true,
                includePwa: false
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.sort()).toEqual([
                '/.editorconfig',
                '/.gitignore',
                '/README.md',
                '/angular.json',
                '/package.json',
                '/projects/bar/.rocket-rc.json',
                '/projects/bar/browserslist',
                '/projects/bar/e2e/protractor.conf.js',
                '/projects/bar/e2e/src/app.e2e-spec.ts',
                '/projects/bar/e2e/src/app.po.ts',
                '/projects/bar/e2e/tsconfig.json',
                '/projects/bar/karma.conf.js',
                '/projects/bar/src/app/app.component.html',
                '/projects/bar/src/app/app.component.scss',
                '/projects/bar/src/app/app.component.spec.ts',
                '/projects/bar/src/app/app.component.ts',
                '/projects/bar/src/app/app.module.ts',
                '/projects/bar/src/app/app.routing.module.ts',
                '/projects/bar/src/app/components/.gitkeep',
                '/projects/bar/src/app/core/core.module.ts',
                '/projects/bar/src/app/models/.gitkeep',
                '/projects/bar/src/app/pipes/.gitkeep',
                '/projects/bar/src/app/services/.gitkeep',
                '/projects/bar/src/app/services/push/push.service.spec.ts',
                '/projects/bar/src/app/services/push/push.service.ts',
                '/projects/bar/src/app/services/window/window.service.spec.ts',
                '/projects/bar/src/app/services/window/window.service.ts',
                '/projects/bar/src/app/shared/shared.module.ts',
                '/projects/bar/src/app/views/.gitkeep',
                '/projects/bar/src/app/views/home/home.component.html',
                '/projects/bar/src/app/views/home/home.component.scss',
                '/projects/bar/src/app/views/home/home.component.spec.ts',
                '/projects/bar/src/app/views/home/home.component.ts',
                '/projects/bar/src/app/views/home/home.guard.spec.ts',
                '/projects/bar/src/app/views/home/home.guard.ts',
                '/projects/bar/src/app/views/home/home.module.ts',
                '/projects/bar/src/app/views/page-not-found/page-not-found.component.html',
                '/projects/bar/src/app/views/page-not-found/page-not-found.component.scss',
                '/projects/bar/src/app/views/page-not-found/page-not-found.component.spec.ts',
                '/projects/bar/src/app/views/page-not-found/page-not-found.component.ts',
                '/projects/bar/src/app/views/page-not-found/page-not-found.module.ts',
                '/projects/bar/src/app/vos/.gitkeep',
                '/projects/bar/src/assets/.gitkeep',
                '/projects/bar/src/environments/environment.prod.ts',
                '/projects/bar/src/environments/environment.ts',
                '/projects/bar/src/favicon.ico',
                '/projects/bar/src/index.html',
                '/projects/bar/src/locale/messages.en.xlf',
                '/projects/bar/src/main.ts',
                '/projects/bar/src/messages.xlf',
                '/projects/bar/src/polyfills.ts',
                '/projects/bar/src/styles.scss',
                '/projects/bar/src/test.ts',
                '/projects/bar/tsconfig.app.json',
                '/projects/bar/tsconfig.spec.json',
                '/projects/bar/tslint.json',
                '/tsconfig.json',
                '/tslint.json',
            ]);
        }));
        it('works without tests', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('schematics', collectionPath);
            const tree = yield runner.runSchematicAsync('scaffold', {
                project: 'bar',
                spec: false,
                includePwa: false
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.sort()).toEqual([
                '/.editorconfig',
                '/.gitignore',
                '/README.md',
                '/angular.json',
                '/package.json',
                '/projects/bar/.rocket-rc.json',
                '/projects/bar/browserslist',
                '/projects/bar/e2e/protractor.conf.js',
                '/projects/bar/e2e/src/app.e2e-spec.ts',
                '/projects/bar/e2e/src/app.po.ts',
                '/projects/bar/e2e/tsconfig.json',
                '/projects/bar/karma.conf.js',
                '/projects/bar/src/app/app.component.html',
                '/projects/bar/src/app/app.component.scss',
                '/projects/bar/src/app/app.component.ts',
                '/projects/bar/src/app/app.module.ts',
                '/projects/bar/src/app/app.routing.module.ts',
                '/projects/bar/src/app/components/.gitkeep',
                '/projects/bar/src/app/core/core.module.ts',
                '/projects/bar/src/app/models/.gitkeep',
                '/projects/bar/src/app/pipes/.gitkeep',
                '/projects/bar/src/app/services/.gitkeep',
                '/projects/bar/src/app/services/push/push.service.ts',
                '/projects/bar/src/app/services/window/window.service.ts',
                '/projects/bar/src/app/shared/shared.module.ts',
                '/projects/bar/src/app/views/.gitkeep',
                '/projects/bar/src/app/views/home/home.component.html',
                '/projects/bar/src/app/views/home/home.component.scss',
                '/projects/bar/src/app/views/home/home.component.ts',
                '/projects/bar/src/app/views/home/home.guard.ts',
                '/projects/bar/src/app/views/home/home.module.ts',
                '/projects/bar/src/app/views/page-not-found/page-not-found.component.html',
                '/projects/bar/src/app/views/page-not-found/page-not-found.component.scss',
                '/projects/bar/src/app/views/page-not-found/page-not-found.component.ts',
                '/projects/bar/src/app/views/page-not-found/page-not-found.module.ts',
                '/projects/bar/src/app/vos/.gitkeep',
                '/projects/bar/src/assets/.gitkeep',
                '/projects/bar/src/environments/environment.prod.ts',
                '/projects/bar/src/environments/environment.ts',
                '/projects/bar/src/favicon.ico',
                '/projects/bar/src/index.html',
                '/projects/bar/src/locale/messages.en.xlf',
                '/projects/bar/src/main.ts',
                '/projects/bar/src/messages.xlf',
                '/projects/bar/src/polyfills.ts',
                '/projects/bar/src/styles.scss',
                '/projects/bar/src/test.ts',
                '/projects/bar/tsconfig.app.json',
                '/projects/bar/tsconfig.spec.json',
                '/projects/bar/tslint.json',
                '/tsconfig.json',
                '/tslint.json',
            ]);
        }));
        it('works with pwa', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('scaffold', {
                project: 'bar',
                spec: true,
                includePwa: true
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.sort()).toEqual([
                '/.editorconfig',
                '/.gitignore',
                '/README.md',
                '/angular.json',
                '/package.json',
                '/projects/bar/.rocket-rc.json',
                '/projects/bar/browserslist',
                '/projects/bar/e2e/protractor.conf.js',
                '/projects/bar/e2e/src/app.e2e-spec.ts',
                '/projects/bar/e2e/src/app.po.ts',
                '/projects/bar/e2e/tsconfig.json',
                '/projects/bar/karma.conf.js',
                '/projects/bar/src/app/app.component.html',
                '/projects/bar/src/app/app.component.scss',
                '/projects/bar/src/app/app.component.spec.ts',
                '/projects/bar/src/app/app.component.ts',
                '/projects/bar/src/app/app.module.ts',
                '/projects/bar/src/app/app.routing.module.ts',
                '/projects/bar/src/app/components/.gitkeep',
                '/projects/bar/src/app/core/core.module.ts',
                '/projects/bar/src/app/models/.gitkeep',
                '/projects/bar/src/app/pipes/.gitkeep',
                '/projects/bar/src/app/services/.gitkeep',
                '/projects/bar/src/app/services/push/push.service.spec.ts',
                '/projects/bar/src/app/services/push/push.service.ts',
                '/projects/bar/src/app/services/window/window.service.spec.ts',
                '/projects/bar/src/app/services/window/window.service.ts',
                '/projects/bar/src/app/shared/shared.module.ts',
                '/projects/bar/src/app/views/.gitkeep',
                '/projects/bar/src/app/views/home/home.component.html',
                '/projects/bar/src/app/views/home/home.component.scss',
                '/projects/bar/src/app/views/home/home.component.spec.ts',
                '/projects/bar/src/app/views/home/home.component.ts',
                '/projects/bar/src/app/views/home/home.guard.spec.ts',
                '/projects/bar/src/app/views/home/home.guard.ts',
                '/projects/bar/src/app/views/home/home.module.ts',
                '/projects/bar/src/app/views/page-not-found/page-not-found.component.html',
                '/projects/bar/src/app/views/page-not-found/page-not-found.component.scss',
                '/projects/bar/src/app/views/page-not-found/page-not-found.component.spec.ts',
                '/projects/bar/src/app/views/page-not-found/page-not-found.component.ts',
                '/projects/bar/src/app/views/page-not-found/page-not-found.module.ts',
                '/projects/bar/src/app/vos/.gitkeep',
                '/projects/bar/src/assets/.gitkeep',
                '/projects/bar/src/environments/environment.prod.ts',
                '/projects/bar/src/environments/environment.ts',
                '/projects/bar/src/favicon.ico',
                '/projects/bar/src/index.html',
                '/projects/bar/src/locale/messages.en.xlf',
                '/projects/bar/src/main.ts',
                '/projects/bar/src/messages.xlf',
                '/projects/bar/src/polyfills.ts',
                '/projects/bar/src/styles.scss',
                '/projects/bar/src/test.ts',
                '/projects/bar/tsconfig.app.json',
                '/projects/bar/tsconfig.spec.json',
                '/projects/bar/tslint.json',
                '/tsconfig.json',
                '/tslint.json',
            ]);
        }));
    });
    describe('without project', () => {
        const workspaceOptions = {
            name: 'workspace',
            newProjectRoot: 'projects',
            version: '9.1.1',
        };
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
        }));
        it('works with tests', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('scaffold', {
                project: '',
                spec: true,
                includePwa: false
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.sort()).toEqual([
                '/.editorconfig',
                '/.gitignore',
                '/.rocket-rc.json',
                '/README.md',
                '/angular.json',
                '/browserslist',
                '/e2e/protractor.conf.js',
                '/e2e/src/app.e2e-spec.ts',
                '/e2e/src/app.po.ts',
                '/e2e/tsconfig.json',
                '/karma.conf.js',
                '/package.json',
                '/src/app/app.component.html',
                '/src/app/app.component.scss',
                '/src/app/app.component.spec.ts',
                '/src/app/app.component.ts',
                '/src/app/app.module.ts',
                '/src/app/app.routing.module.ts',
                '/src/app/components/.gitkeep',
                '/src/app/core/core.module.ts',
                '/src/app/models/.gitkeep',
                '/src/app/pipes/.gitkeep',
                '/src/app/services/.gitkeep',
                '/src/app/services/push/push.service.spec.ts',
                '/src/app/services/push/push.service.ts',
                '/src/app/services/window/window.service.spec.ts',
                '/src/app/services/window/window.service.ts',
                '/src/app/shared/shared.module.ts',
                '/src/app/views/.gitkeep',
                '/src/app/views/home/home.component.html',
                '/src/app/views/home/home.component.scss',
                '/src/app/views/home/home.component.spec.ts',
                '/src/app/views/home/home.component.ts',
                '/src/app/views/home/home.guard.spec.ts',
                '/src/app/views/home/home.guard.ts',
                '/src/app/views/home/home.module.ts',
                '/src/app/views/page-not-found/page-not-found.component.html',
                '/src/app/views/page-not-found/page-not-found.component.scss',
                '/src/app/views/page-not-found/page-not-found.component.spec.ts',
                '/src/app/views/page-not-found/page-not-found.component.ts',
                '/src/app/views/page-not-found/page-not-found.module.ts',
                '/src/app/vos/.gitkeep',
                '/src/assets/.gitkeep',
                '/src/environments/environment.prod.ts',
                '/src/environments/environment.ts',
                '/src/favicon.ico',
                '/src/index.html',
                '/src/locale/messages.en.xlf',
                '/src/main.ts',
                '/src/messages.xlf',
                '/src/polyfills.ts',
                '/src/styles.scss',
                '/src/test.ts',
                '/tsconfig.app.json',
                '/tsconfig.json',
                '/tsconfig.spec.json',
                '/tslint.json',
            ]);
        }));
        it('works without tests', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('schematics', collectionPath);
            const tree = yield runner.runSchematicAsync('scaffold', {
                project: '',
                spec: false,
                includePwa: false
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.sort()).toEqual([
                '/.editorconfig',
                '/.gitignore',
                '/.rocket-rc.json',
                '/README.md',
                '/angular.json',
                '/browserslist',
                '/e2e/protractor.conf.js',
                '/e2e/src/app.e2e-spec.ts',
                '/e2e/src/app.po.ts',
                '/e2e/tsconfig.json',
                '/karma.conf.js',
                '/package.json',
                '/src/app/app.component.html',
                '/src/app/app.component.scss',
                '/src/app/app.component.ts',
                '/src/app/app.module.ts',
                '/src/app/app.routing.module.ts',
                '/src/app/components/.gitkeep',
                '/src/app/core/core.module.ts',
                '/src/app/models/.gitkeep',
                '/src/app/pipes/.gitkeep',
                '/src/app/services/.gitkeep',
                '/src/app/services/push/push.service.ts',
                '/src/app/services/window/window.service.ts',
                '/src/app/shared/shared.module.ts',
                '/src/app/views/.gitkeep',
                '/src/app/views/home/home.component.html',
                '/src/app/views/home/home.component.scss',
                '/src/app/views/home/home.component.ts',
                '/src/app/views/home/home.guard.ts',
                '/src/app/views/home/home.module.ts',
                '/src/app/views/page-not-found/page-not-found.component.html',
                '/src/app/views/page-not-found/page-not-found.component.scss',
                '/src/app/views/page-not-found/page-not-found.component.ts',
                '/src/app/views/page-not-found/page-not-found.module.ts',
                '/src/app/vos/.gitkeep',
                '/src/assets/.gitkeep',
                '/src/environments/environment.prod.ts',
                '/src/environments/environment.ts',
                '/src/favicon.ico',
                '/src/index.html',
                '/src/locale/messages.en.xlf',
                '/src/main.ts',
                '/src/messages.xlf',
                '/src/polyfills.ts',
                '/src/styles.scss',
                '/src/test.ts',
                '/tsconfig.app.json',
                '/tsconfig.json',
                '/tsconfig.spec.json',
                '/tslint.json',
            ]);
        }));
        it('works with pwa', () => __awaiter(void 0, void 0, void 0, function* () {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = yield runner.runSchematicAsync('scaffold', {
                project: 'bar',
                spec: false,
                includePwa: true
            }, appTree).toPromise();
            // Listing files
            expect(tree.files.sort()).toEqual([
                '/.editorconfig',
                '/.gitignore',
                '/.rocket-rc.json',
                '/README.md',
                '/angular.json',
                '/browserslist',
                '/e2e/protractor.conf.js',
                '/e2e/src/app.e2e-spec.ts',
                '/e2e/src/app.po.ts',
                '/e2e/tsconfig.json',
                '/karma.conf.js',
                '/package.json',
                '/src/app/app.component.html',
                '/src/app/app.component.scss',
                '/src/app/app.component.ts',
                '/src/app/app.module.ts',
                '/src/app/app.routing.module.ts',
                '/src/app/components/.gitkeep',
                '/src/app/core/core.module.ts',
                '/src/app/models/.gitkeep',
                '/src/app/pipes/.gitkeep',
                '/src/app/services/.gitkeep',
                '/src/app/services/push/push.service.ts',
                '/src/app/services/window/window.service.ts',
                '/src/app/shared/shared.module.ts',
                '/src/app/views/.gitkeep',
                '/src/app/views/home/home.component.html',
                '/src/app/views/home/home.component.scss',
                '/src/app/views/home/home.component.ts',
                '/src/app/views/home/home.guard.ts',
                '/src/app/views/home/home.module.ts',
                '/src/app/views/page-not-found/page-not-found.component.html',
                '/src/app/views/page-not-found/page-not-found.component.scss',
                '/src/app/views/page-not-found/page-not-found.component.ts',
                '/src/app/views/page-not-found/page-not-found.module.ts',
                '/src/app/vos/.gitkeep',
                '/src/assets/.gitkeep',
                '/src/environments/environment.prod.ts',
                '/src/environments/environment.ts',
                '/src/favicon.ico',
                '/src/index.html',
                '/src/locale/messages.en.xlf',
                '/src/main.ts',
                '/src/messages.xlf',
                '/src/polyfills.ts',
                '/src/styles.scss',
                '/src/test.ts',
                '/tsconfig.app.json',
                '/tsconfig.json',
                '/tsconfig.spec.json',
                '/tslint.json',
            ]);
        }));
    });
});
//# sourceMappingURL=index_spec.js.map