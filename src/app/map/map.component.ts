import {Component, ElementRef, AfterViewInit, ViewChild, Input} from '@angular/core';

import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import View from 'ol/View.js';
import {toStringHDMS} from 'ol/coordinate.js';
import TileLayer from 'ol/layer/Tile.js';
import {toLonLat} from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import {transform} from 'ol/proj';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('mapa', { static: false }) mapa: ElementRef;
  @ViewChild('popup', { static: false }) popup: ElementRef;
  @ViewChild('popupContent', { static: false }) popupContent: ElementRef;
  @ViewChild('popupCloser', { static: false }) popupCloser: ElementRef;

  @Input() zoom: number = 2;

  map: Map;

  ngAfterViewInit()  {
    const container = this.popup.nativeElement;
    const content = this.popupContent.nativeElement;
    const closer = this.popupCloser.nativeElement;

    const overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    closer.onclick = () => {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: this.mapa.nativeElement,
      view: new View({
        center: transform([-38.5599713, -3.7345571],'EPSG:4326', 'EPSG:3857'),
        zoom: this.zoom
      })
    });

    this.map.addOverlay(overlay);

    this.map.on('singleclick', (evt) => {
      const coordinate = evt.coordinate;
      const hdms = toStringHDMS(toLonLat(coordinate));
      const element = overlay.getElement();
      element.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
      overlay.setPosition(coordinate);
    });

  }

}
