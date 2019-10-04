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
  @Input() visitaColor: string = 'green';
  @Input() visitaAtendidaColor: string = 'orange';

  raio = 8.5; 

  constructor(private host: ElementRef) { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    const hostElement = this.host.nativeElement.firstChild;

    const styles = getComputedStyle(hostElement);

    const width = parseInt(styles.width, 10);

    const _visitas = this.visitas.sort((a, b) => (a.hora > b.hora) ? 1 : -1);

    console.log(_visitas);

    _visitas.forEach(visita => {
      visita.horaFormatada = this.converteHora(visita.hora);
    });

    const tooltip = d3
      .select(hostElement)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const scala = d3
      .scaleLinear()
      .domain(d3.extent(_visitas, d => d.hora))
      .nice()
      .range([width * 0.05, width * 0.95]);


    const svg = d3
      .select(hostElement)
      .append('svg')
      .attr('width', width)
      .attr('height', 65);

    const xAxis = d3
      .axisBottom()
      .scale(scala)
      .tickValues([6.0, 10.0, 14.0, 18.0, 22.0])
      .tickFormat((d, i) => {
        return this.converteHora(d);
      });

   // Append group and insert axis
    svg.append('g')
      .call(xAxis)
      .attr('transform', 'translate(00, 30)')

    const gg = svg
      .append('g');

    const g = gg
      .selectAll('g')
      .data(_visitas)
      .enter()
      .append('g')
      .attr('transform', (d) => {
        return `translate(${scala(d.hora)}, 30)`;
      });

    g.append('circle')
      .attr('opacity', 0.8)
      .attr('r', this.raio)
      .attr('fill', (d) => {
        if (d.tipo === 'visita') {
          if (d.status && d.status === 'atendida') {
            return this.visitaAtendidaColor;
          }
          return this.visitaColor;
        }
        return 'transparent';
      })
      .on('mouseover', (d) => {
        if (d.tipo === 'visita') {
          tooltip
            .transition()
            .duration(200)
            .style('opacity', .9);
          tooltip.html(d.horaFormatada)
            .style('top', '0')
            .style('left', (scala(d.hora) - 10) + 'px');
        }
      })
      .on('mouseout', () => {
        tooltip
          .transition()
          .duration(500)
          .style('opacity', 0);
      })

  }
  converteHora = (value: number): string => {
    return moment(value, 'HH').format('HH:mm');
  }


}
