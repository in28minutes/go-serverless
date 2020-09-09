import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core'; // './app.component';
// import { AppComponent } from '../app.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {

  message = 'Some Welcome Message';
  welcomeMessageFromService: string;
  name = '';
  // ActivatedRoute
  constructor(
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    // COMPILATION ERROR this.message = 5
    console.log(this.message)
    console.log(this.route.snapshot.params['name'])
    this.name = this.route.snapshot.params['name'];

  }

  handleSuccessfulResponse(response) {
    this.welcomeMessageFromService = response.message;
    // console.log(response);
  }

  handleErrorResponse(error) {
    // console.log(error);
    this.welcomeMessageFromService = error.error.message;
  }
}
