import { SerieService } from './../services/serie.service';
import { GeneroService } from './../services/genero.service';
import { ISerieApi } from './../models/ISerieApi.models';
import { Component, OnInit } from '@angular/core';
import { DadosService } from './../services/dados.service';

@Component({
  selector: 'app-dados-serie',
  templateUrl: './dados-serie.page.html',
  styleUrls: ['./dados-serie.page.scss'],
})
export class DadosSeriePage implements OnInit {

  serie: ISerieApi;
  generos: string[] = [];

  constructor(
    public dadosService: DadosService,
    public serieService: SerieService,
    public generoService: GeneroService
    ) { }

  ngOnInit() {
    this.serie = this.dadosService.pegarDados('serie');
    this.generos = this.dadosService.pegarDados('generos');

    this.generoService.buscarGeneros('tv').subscribe(dados =>{
      dados.genres.forEach(genero => {
        this.generos[genero.id] = genero.name;
      });
    });
  }

}
