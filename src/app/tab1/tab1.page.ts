import { IGenero } from './../models/IGenero.models';
import { GeneroService } from './../services/genero.service';
import { IListaFilmes, IFilmeApi } from './../models/IFilmeApi.model';
import { FilmeService } from './../services/filme.service';
import { IFilme } from './../models/IFilme.models';
import { DadosService } from './../services/dados.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  titulo = "Filmes";

  listaVideos: IFilme[] = [
    {
      nome: 'Mortal Kombat (2021)',
      lancamento: '15/04/2021',
      duracao: '1h 50m',
      classificacao: 76,
      cartaz: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/w8BVC3qrCWCiTHRz4Rft12dtQF0.jpg',
      generos: ['Ação', 'Fantasia', 'Aventura'],
      pagina: '/mortal-kombat'
    },
    {
      nome: 'Liga da Justiça de Zack Snyder (2021)',
      lancamento: '18/03/2021',
      duracao: '4h 2m',
      classificacao: 76,
      cartaz: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ArWn6gCi61b3b3hclD2L0LOk66k.jpg',
      generos: ['Ação', 'Aventura', 'Fantasia', 'Ficção científica'],
      pagina: '/liga-justica'
    },
    {
      nome: 'Godzilla vs. Kong (2021)',
      lancamento: '01/04/2021',
      duracao: '1h 53m',
      classificacao: 81,
      cartaz: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/wllzjZxg4ynlAm5xmOICJ2uHOPJ.jpg',
      generos: ['Ação', 'Drama', 'Ficção científica'],
      pagina: '/godzilla'
    },
    {
      nome: 'A Mensageira (2019)',
      lancamento: '12/12/2019',
      duracao: '1h 39m',
      classificacao: 62,
      cartaz: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jE6QFRd48IzAxAubOE9HKB8sTjP.jpg',
      generos: ['Ação', 'Crime', 'Drama', 'Thriller'],
      pagina: '/mensageira'
    },
    {
      nome: 'O Poderoso Chefão (1972)',
      lancamento: '07/07/1972',
      duracao: '2h 55m',
      classificacao: 62,
      cartaz: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/oJagOzBu9Rdd9BrciseCm3U3MCU.jpg',
      generos: ['Crime', 'Drama'],
      pagina: '/poderoso-chefao'
    }
  ];

  listaFilmes: IListaFilmes;

  generos: string[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public filmeService: FilmeService,
    public generoService: GeneroService,
    public route: Router
    ) {}

    buscarFilmes(evento: any){
      console.log(evento.target.value);
      const busca = evento.target.value;
      if(busca && busca.trim() !== ''){
        this.filmeService.buscarFilmes(busca).subscribe(dados=>{
          console.log(dados);
          this.listaFilmes = dados;
        });
      }
    }

    exibirFilme(filme: IFilmeApi){
      this.dadosService.guardarDados('filme', filme);
      this.route.navigateByUrl('/dados-filme');
    }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({

      header: 'Alerta!',
      message: 'Deseja favoritar o filme?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim, favoritar',
          handler: () => {
            this.apresentarToast();
          }
        }
      ]
    });

    await alert.present();
  }

  async apresentarToast() {
    const toast = await this.toastController.create({
      message: 'Filme adicionado aos favoritos.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  ngOnInit(){
    this.generoService.buscarGeneros('movie').subscribe(dados =>{
      //console.log('Generos; ',dados.genres);
      dados.genres.forEach(genero => {
        this.generos[genero.id] = genero.name;
      });

      this.dadosService.guardarDados('generos', this.generos);
    });

  }
}
