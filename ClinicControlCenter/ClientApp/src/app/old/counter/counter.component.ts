import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }

  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }

  public test() {
    this.http.get(this.baseUrl + 'IsAdmin').subscribe(result => {

    }, error => console.error(error));
  }
}
