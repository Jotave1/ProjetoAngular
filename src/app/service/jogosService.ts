import { jogoProduto } from './../model/jogo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first, Observable, pipe, tap } from 'rxjs';
import { FormGroup } from '@angular/forms';


@Injectable({
    providedIn: 'root',
})
export class JogosService {
    private API_URL = 'http://localhost:3000/jogos';
    constructor(private http: HttpClient) {}

    list(): Observable<jogoProduto[]> {
        console.log("lista")
        return this.http.get<jogoProduto[]>(this.API_URL).pipe(
        first(),
        tap((j) => console.log(j))
    );
    }

    search(nome: string): Observable<jogoProduto[]> {
      return this.http.get<jogoProduto[]>(this.API_URL + '?categoria=' + nome).pipe(
      first(),
      tap((j) => console.log(j))
  );
  }

    //public novoProdutoForm: FormGroup | nenhum;

    create(j: jogoProduto) {
      this.http.post(this.API_URL, j)
        .subscribe(
          resultado => {
            console.log('Produto adicionado com sucesso.')
              },
                erro => {
                  switch(erro.status) {
                    case 400:
                      console.log(erro.error.mensagem);
                      break;
                    case 404:
                      console.log('Produto não localizado.');
                      break;
                  }
                }
        );
    }



    update(j: jogoProduto) {
      console.log(j);
      this.http.put(this.API_URL + '/' + j.id, j)
        .subscribe(
          resultado => {
            console.log('Produto alterado com sucesso.')
              },
                erro => {
                  switch(erro.status) {
                    case 400:
                      console.log(erro.error.mensagem);
                      break;
                    case 404:
                      console.log('Produto não localizado.');
                      break;
                  }
                }
        );
    }

    delete(id: number) {
      console.log("id Delete", id);
      this.http.delete(this.API_URL + '/' + id)
        .subscribe(
          resultado => {
            console.log('Produto deletedo com sucesso')
              },
                erro => {
                  switch(erro.status) {
                    case 400:
                      console.log(erro.error.mensagem);
                      break;
                    case 404:
                      console.log('Produto não localizado.');
                      break;
                  }
                }
        );
    }
}
