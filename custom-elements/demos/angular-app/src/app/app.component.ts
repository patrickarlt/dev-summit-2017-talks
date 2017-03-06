import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public webmap: string;
  constructor () {
    this.webmap = '6e3ef9427a07417e9e576c1652fbdbc4';
  }

  handleSubmit (e) {
    console.log(e);
  }

  handleChange (e) {
    console.log(e.target.value);
    this.webmap = e.target.value;
  }
}
