import { jogoProduto } from './../../model/jogo';
import { Component, ElementRef, Inject, ViewChild, OnInit, numberAttribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JogosService} from '../../service/jogosService';

@Component({
  selector: 'app-create',
  standalone: false,

  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit{

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

  enviar() {
    this.jogosService.create(this.jogo);
    window.location.replace("");

  }

  cancelar() {
    window.location.replace("");
  }

  constructor(
    private activatedRoute : ActivatedRoute,
    private jogosService: JogosService
  ) { }



  ngOnInit(){
    this.jogo.id = (this.activatedRoute.snapshot.queryParamMap.get("maxID") || '');
  }

}
