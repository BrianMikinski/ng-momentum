import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {<%= classify(name) %>RoutingModule} from './<%= dasherize(name) %>.routing.module';

<% if(ui.toString() === 'bootstrap'){ %>
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
<% } %>

import {<%= classify(pluralize(name)) %>ListComponent} from './<%= dasherize(pluralize(name)) %>.list.component';
import {<%= classify(pluralize(name)) %>ListGuard} from './<%= dasherize(pluralize(name)) %>.list.guard';
import {<%= classify(singularize(name)) %>Component} from './<%= dasherize(singularize(name)) %>.details.component';
import {<%= classify(singularize(name)) %>Guard} from './<%= dasherize(singularize(name)) %>.details.guard';
import {New<%= classify(singularize(name)) %>Component} from './<%= dasherize(singularize(name)) %>.new.component';
import {New<%= classify(singularize(name)) %>Guard} from './<%= dasherize(singularize(name)) %>.new.guard';
import {Edit<%= classify(singularize(name)) %>Component} from './<%= dasherize(singularize(name)) %>.edit.component';
import {Edit<%= classify(singularize(name)) %>Guard} from './<%= dasherize(singularize(name)) %>.edit.guard';

import {<%= classify(pluralize(service)) %>Service} from '<%= absoluteSrcPath(servicePath) %>/<%= dasherize(pluralize(service)) %>.service';
<% if(ui.toString() === 'material'){ %>
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule } from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
<% } %>

@NgModule({
  declarations: [
    <%= classify(pluralize(name)) %>ListComponent,
    New<%= classify(singularize(name)) %>Component,
    <%= classify(singularize(name)) %>Component,
    Edit<%= classify(singularize(name)) %>Component,
  ],
  imports: [
    SharedModule,
    <% if(ui.toString() === 'bootstrap'){ %>NgbModule,
    <% } %><% if(ui.toString() === 'material'){ %>MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,<% } %>
    <%= classify(name) %>RoutingModule
  ],
  providers: [
    <%= classify(pluralize(service)) %>Service,
    <%= classify(pluralize(name)) %>ListGuard,
    New<%= classify(singularize(name)) %>Guard,
    <%= classify(singularize(name)) %>Guard,
    Edit<%= classify(singularize(name)) %>Guard,
  ]
})

export class <%= classify(name) %>Module {
}
