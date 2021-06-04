import { GeneroService } from './../services/genero.service';
import { FilmeService } from './../services/filme.service';
import { IFilmeApi,  } from './../models/IFilmeApi.model';
import { DadosService } from './../services/dados.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dados-filme',
  templateUrl: './dados-filme.page.html',
  styleUrls: ['./dados-filme.page.scss'],
})
export class DadosFilmePage implements OnInit {

  filme: IFilmeApi;

  generos: string[] = [];

  constructor(
    public dadosService: DadosService,
    public filmeService: FilmeService,
    public generoService: GeneroService
    ) { }

  ngOnInit() {
    this.filme = this.dadosService.pegarDados('filme');
    this.generos = this.dadosService.pegarDados('generos');

    this.generoService.buscarGeneros('movie').subscribe(dados =>{
      dados.genres.forEach(genero => {
        this.generoService[genero.id] = genero.name;
      });
    });
  }

}
