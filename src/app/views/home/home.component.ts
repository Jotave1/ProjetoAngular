import { jogoProduto } from './../../model/jogo';
import { Component, input } from '@angular/core';
import { JogosService} from '../../service/jogosService';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  buscar: string= '';
  maxID: number = 0;
  jogoProduto: any;
  onCreate() {
    this.maxID = 0;
    this.jogos_array.forEach(item => {
      if(this.maxID < Number(item.id)) {
        this.maxID = Number(item.id);
      }

    });
      this.router.navigate(['/create'], { queryParams: { maxID: this.maxID + 1} });

    console.log(this.maxID + "id atual");
  }

    onEdit(id: string): void{
    this.jogos_array.forEach(item => {
      if(id === item.id) {
        this.router.navigate(['/edit'], { queryParams: { id: id, nome: item.nome, categoria: item.categoria, preco: item.preco} });
      }
      console.log(item.id + item.nome);
    });

    //this.router.navigate([`edit`]);
    //console.log(id);
  //window.location.replace("edit");
}

onDelete(id: number) {
  this.jogosService.delete(id);
  console.log("Delete");
  window.location.replace("");
}

onSearch() {
  console.log(this.buscar);
  this.jogosService.search(this.buscar).subscribe((j) => (this.jogos_array = j));
  this.dataSource = this.jogos_array;
}

  //jogoProduto$: Observable<jogoProduto[]>;
  jogos_array: jogoProduto[] = [];
  displayedColumns: string[] = ['id', 'nome', 'preco', 'categoria', 'actions'];
  dataSource = this.jogos_array;

  constructor(
    private jogosService: JogosService,
    //public _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
    this.jogosService.list().subscribe((j) => (this.jogos_array = j));
    this.dataSource = this.jogos_array;
  }
}



