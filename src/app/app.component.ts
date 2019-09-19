import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ol-multi';

  pontos: any = [
    {
      x: -38.5599713,
      y: -3.7345571
    }
  ];


}
