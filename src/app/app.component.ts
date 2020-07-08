import { Component } from '@angular/core';
import {
  NgxRumbletalkService,
  LoginData,
  LogoutData,
  LogoutCbData
} from 'ngx-rumbletalk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hash = 'z5ABFdMN';
  title = 'ngx-rumbletalk-app';
  username: string;
  password: string;

  constructor(private service: NgxRumbletalkService) {}

  handleLogin(): void {
    const data: LoginData = {
      hash: this.hash,
      username: this.username,
      password: this.password,
      image: ''
    };
    this.service
      .login(data)
      .then(res => {
        console.log('response', res);
      })
      .catch(err => console.log(err));
  }

  handleLogout(): void {
    const data: LogoutData = {
      hash: this.hash,
      username: this.username
    };
    this.service.logout(data);
  }

  handleLogoutCB(): void {
    const data: LogoutCbData = {
      hash: this.hash,
      callback: reason => {
        console.log('handleLogoutCB', reason);
      }
    };
    this.service.logoutCB(data);
  }
}
