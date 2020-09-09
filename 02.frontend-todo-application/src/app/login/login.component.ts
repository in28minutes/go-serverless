import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticaterUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'in28minutes';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  constructor(private route: ActivatedRoute, private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    if (this.authenticationService.isTokenAvailableInURL()) {
      this.authenticationService.loginWithTokenFromURL()
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false;
    }
  }

  handleLogin() {
    console.log(this.username);
    // Redirect to Welcome Page
    this.router.navigate(['welcome', this.username]);
    this.invalidLogin = false;
    sessionStorage.setItem(AUTHENTICATED_USER, this.username);
    sessionStorage.setItem(TOKEN, `DUMMY_TOKEN ${this.username}`);

  }

  handleAWSCognitoLogin() {
    this.authenticationService.executeAWSCognitoAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log('in success method : ' + data);
          console.log('username : ' + this.username);
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        }
      );
  }

}
