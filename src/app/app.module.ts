import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';

import { HttpClientModule } from '@angular/common/http';
import { TestComponentComponent } from './_test/test-component/test-component.component';
import { CategorySelectorComponent } from './main-page/category-selector/category-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TestComponentComponent,
    CategorySelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
