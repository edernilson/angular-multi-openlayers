import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Input,
  Output,
  OnInit
} from '@angular/core';

import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import View from 'ol/View.js';
import { toStringHDMS } from 'ol/coordinate.js';
import { toLonLat } from 'ol/proj.js';
import { transform } from 'ol/proj';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('mapa', { static: true }) mapaDiv: ElementRef;
  @ViewChild('popup', { static: true }) popup: ElementRef;
  @ViewChild('popupContent', { static: true }) popupContent: ElementRef;
  @ViewChild('popupCloser', { static: true }) popupCloser: ElementRef;

  @Input() zoom = 2;

  instance: Map;
  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
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

    this.instance = new Map({
      target: this.mapaDiv.nativeElement,
      view: new View({
        center: transform([-38.5599713, -3.7345571], 'EPSG:4326', 'EPSG:3857'),
        zoom: this.zoom
      })
    });

    this.instance.addOverlay(overlay);

    this.instance.on('singleclick', evt => {
      const coordinate = evt.coordinate;
      const hdms = toStringHDMS(toLonLat(coordinate));
      const element = overlay.getElement();
      element.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
      overlay.setPosition(coordinate);
    });
  }
}
