import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { OsmComponent } from './map/osm/osm.component';
import { RotaLayerComponent } from './map/rota-layer/rota-layer.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    OsmComponent,
    RotaLayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
