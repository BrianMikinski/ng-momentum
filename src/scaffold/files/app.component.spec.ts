import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

<% if(ui.toString() === 'material'){ %>
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
<% } %>

import {AppComponent} from './app.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [
                <% if(ui.toString() === 'material'){ %>MatToolbarModule,
                MatButtonModule,
                <% } %>RouterTestingModule,
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'app'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app');
    }));

    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        <% if(ui.toString() === 'material'){ %>expect(compiled.querySelector('mat-toolbar').textContent).toContain('Welcome to app!');<% } else { %>expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
        <% } %>
    }));

});
