import { Component } from '@angular/core';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ol-multi";

  pontos: any = [
    {
      x: -38.5599713,
      y: -3.7345571
    }
  ];

  visitas = [
    { hora: 6.0, tipo: 'marcador', },
    { hora: 10.0, tipo: 'marcador', },
    { hora: 14.0, tipo: 'marcador', },
    { hora: 18.0, tipo: 'marcador', },
    { hora: 22.0, tipo: 'marcador', },
    { hora: 8.35, tipo: 'visita', },
    { hora: 9.30, tipo: 'visita', },
    { hora: 11.14, tipo: 'visita', },
    { hora: 14.45, tipo: 'visita', },
    { hora: 15.55, tipo: 'visita', },
    { hora: 17.25, tipo: 'visita', },
  ];
}
