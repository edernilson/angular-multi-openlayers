import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MapComponent } from '../map.component';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

@Component({
  selector: 'app-rota-layer',
  template: ''
})
export class RotaLayerComponent implements OnInit, AfterViewInit {
  @Input() idRota: string;
  @Input() pontos: any;
  @Input() trajeto: any[] = [];

  vectorSource: VectorSource = new VectorSource({});
  rotaLayer: VectorLayer = new VectorLayer({
    source: this.vectorSource,
  });

  constructor(private mapaSource: MapComponent) { }

  ngOnInit() {
    console.log(this.pontos);
    console.log(this.idRota);
  }

  ngAfterViewInit(): void {
  }

}
