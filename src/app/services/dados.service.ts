import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  private dados: any = [];

  constructor() {}

  guardarDados(index: string, dados: any): boolean{
    if(index){
      this.dados[index] = dados;
      return true;
    } else {
      return false;
    }
  }

  pegarDados(index: string): any {
    if(index){
      return this.dados[index];
    } else {
      return null;
    }
  }

  deletarDados(index: string): boolean {
    if(index){
      return delete this.dados[index];
    }
  }

}
