import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';

import { HttpClientModule } from '@angular/common/http';
import { TestComponentComponent } from './_test/test-component/test-component.component';
import { CategorySelectorComponent } from './main-page/category-selector/category-selector.component';
import { CompositeScoreComponent } from './main-page/composite-score/composite-score.component';
import { SafePipe } from './safe.pipe';

import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { OutliersComponent } from './outliers/outliers.component';
import { ErrorPageComponent } from './error-page/error-page.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TestComponentComponent,
    CategorySelectorComponent,
    CompositeScoreComponent,
    SafePipe,
    LoginPageComponent,
    OutliersComponent,
    ErrorPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
