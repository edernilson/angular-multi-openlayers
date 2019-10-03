import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { MapComponent } from '../map.component';

import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'app-osm',
  template: ''
})
export class OsmComponent implements OnInit, AfterViewInit {

  osmTile: TileLayer = new TileLayer({
    source: new OSM()
  });

  constructor(private mapaSource: MapComponent) {
  }

  ngOnInit() {
    this.mapaSource.mapaObj.addLayer(this.osmTile);
  }

  ngAfterViewInit(): void {
  }

}
