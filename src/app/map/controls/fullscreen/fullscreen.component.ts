import { Component, OnInit, Input } from '@angular/core';
import { MapComponent } from '../../map.component';
import FullScreen from 'ol/control/fullScreen';

@Component({
  selector: 'app-fullscreen',
  template: '',
})
export class FullscreenComponent implements OnInit {
  @Input() className;

  fullScreen: FullScreen;

  constructor(private mapaSource: MapComponent) { }

  ngOnInit() {
    this.fullScreen = new FullScreen(this);
    this.mapaSource.mapaObj.addControl(this.fullScreen);
  }

}
