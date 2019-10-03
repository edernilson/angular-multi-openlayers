import { Component, OnInit, AfterContentInit, ElementRef, Input } from '@angular/core';

import * as d3 from 'd3';
import * as moment from 'moment';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, AfterContentInit {
  @Input() visitas: any[];

  constructor(private host: ElementRef) { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    const _hostElement = this.host.nativeElement.firstChild;

    const styles = getComputedStyle(_hostElement);

    const width = parseInt(styles.width, 10);

    const _visitas = this.visitas.sort((a, b) => (a.hora > b.hora) ? 1 : -1);

    console.log(_visitas);

    this.visitas.forEach(visita => {
      visita.horaFormatada = this.converteHora(visita.hora);
    });

    const scale = d3
      .scaleLinear()
      .domain(d3.extent(_visitas, d => d.hora))
      .nice()
      .range([width * 0.05, width * 0.95]);


    const svg = d3
      .select(_hostElement)
      .append('svg')
      .attr('width', width)
      .attr('height', 65);

    const xAxis = d3
      .axisBottom()
      .scale(scale)
      .tickValues([6.0, 10.0, 14.0, 18.0, 22.0])
      .tickFormat((d, i) => {
        return this.converteHora(d);
      });

   // Append group and insert axis
    svg.append('g')
        .call(xAxis);
  }
  converteHora = (value: number): string => {
    return moment(value, 'HH').format('HH:mm');
  }


}
