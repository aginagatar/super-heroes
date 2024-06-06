// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// project import
import { AppComponent } from './app.component';
import { SharedModule } from './superheroes/shared/shared.module';
import { ToggleFullScreenDirective } from './superheroes/shared/full-screen/toggle-full-screen';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AdminComponent } from './superheroes/layout/admin.component';
import { NavBarComponent } from './superheroes/layout/nav-bar/nav-bar.component';
import { NavigationComponent } from './superheroes/layout/navigation/navigation.component';
import { NavContentComponent } from './superheroes/layout/navigation/nav-content/nav-content.component';
import { NavLogoComponent } from './superheroes/layout/navigation/nav-logo/nav-logo.component';
import { NavCollapseComponent } from './superheroes/layout/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './superheroes/layout/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './superheroes/layout/navigation/nav-content/nav-item/nav-item.component';
import { NavigationItem } from './superheroes/layout/navigation/navigation';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    NavBarComponent,
    NavigationComponent,
    NavContentComponent,
    NavLogoComponent,
    NavCollapseComponent,
    NavGroupComponent,
    NavItemComponent,
    ToggleFullScreenDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [NavigationItem, provideAnimationsAsync(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' } // Set the locale to Spanish (Spain)
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
