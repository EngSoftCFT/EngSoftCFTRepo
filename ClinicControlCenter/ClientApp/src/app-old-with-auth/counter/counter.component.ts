import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-counter-component",
  templateUrl: "./counter.component.html",
  styleUrls: ["../styles.scss"],
})
export class CounterComponent {
  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }

  public test() {
    (window as any).test2 = this.http.get(this.baseUrl + "IsAdmin").subscribe(
      (result) => {
        (window as any).test = result;
      },
      (error) => console.error(error)
    );
  }
}
