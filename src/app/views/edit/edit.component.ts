import { jogoProduto } from './../../model/jogo';
import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JogosService} from '../../service/jogosService';


@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  id: string = "";
  nome: string = "";
  categoria: string = "";
  preco: number = 0;

  jogo: jogoProduto = {
    id: '',
    nome: '',
    categoria: '',
    preco: 0
  }


enviar(){
  this.jogosService.update(this.jogo);
  console.log(this.jogo)
  window.location.replace("");
  // alert(this.jogo.nome + this.jogo.categoria + this.jogo.preco);
}
cancelar(){
  window.location.replace("");
}

constructor(
  private activatedRoute : ActivatedRoute,
  private jogosService: JogosService
) { }

ngOnInit(){
  this.jogo.id = (this.activatedRoute.snapshot.queryParamMap.get("id") || '');
  this.jogo.nome = this.activatedRoute.snapshot.queryParamMap.get("nome") || '';
  this.jogo.categoria = this.activatedRoute.snapshot.queryParamMap.get("categoria") || '';
  this.jogo.preco = Number(this.activatedRoute.snapshot.queryParamMap.get("preco") || 0);
  console.log(this.jogo);
}


}
