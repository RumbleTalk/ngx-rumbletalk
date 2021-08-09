import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginData } from './interface/login-data';
import { LogoutData } from './interface/logout-data';
import { LogoutCbData } from './interface/logout-cb-data';
import { OpenPrivateChatData } from './interface/open-private-chat-data';
declare const window: any;

@Injectable()
export class NgxRumbletalkService {
  public iframe: any;
  public server: string;
  public handleResolve;
  public handleReject;
  public iframeLoaded = new Promise((resolve, reject) => {
    this.handleResolve = resolve;
    this.handleReject = reject;
  });

  readonly postMessageEvents: any = {
    LOGOUT_CB: 'pm.1',
    LOGOUT_CB_RECEIVED: 'pm.2',
    LOGIN: 'pm.3',
    LOGIN_SUCCESS: 'pm.4',
    LOGIN_ALREADY_LOGGED_IN: 'pm.5',
    LOGOUT: 'pm.6',
    OPEN_PRIVATE_CHAT: 'pm.7'
};

  constructor(private http: HttpClient) {}

  address(hash: string): Observable<string> {
    return this.http
      .get<string>(`https://www.rumbletalk.com/client/service.php?hash=${hash}`)
      .pipe(map((data: any) => data.address));
  }

  reload(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  login(data: LoginData): Promise<any> {
    return new Promise((resolve, reject) => {
      const message: any = {};

      /* handle username value */
      message.username = this.trim(data.username);
      if (!this.validateUsername(message.username)) {
        reject('Error: invalid username in "login" function');
      }

      /* handle, if set, password value */
      if (data.password) {
        if (!this.validatePassword(data.password)) {
          reject('Error: invalid password in "login" function');
        }
        message.password = data.password;
      }

      /* handle, if set, image URL */
      if (data.image) {
        if (!this.validateUrl(data.image)) {
          reject('Error: invalid image in "login" function');
        }
        message.image = data.image;
      }

      message.type = this.postMessageEvents.LOGIN;
      message.hash = data.hash;
      message.forceLogin = data.forceLogin;

      /* keep sending the data to the chat until the chat responds */
      const intervalHandle = setInterval(() => {
        this.postMessage(message);
      }, 1000);

      window.addEventListener(
        'message',
        function handlePostMessage(event) {
          /* validates the origin to be from a chat */
          if (!this.validateChatOrigin(event.origin)) {
            console.log('Error: invalid origin in "login" function');
          }

          if (typeof event.data !== 'object') {
            console.log(`Error: invalid data received in RumbleTalk SDK: ${event.data}`);
          }

          /* different chat callback */
          if (event.data.hash !== data.hash) {
            reject('Error: chat hash mismatch');
          }

          /* validate that the message is of a successful login of the specific chat */
          if (
            event.data.type === this.postMessageEvents.LOGIN_SUCCESS ||
            event.data.type === this.postMessageEvents.LOGIN_ALREADY_LOGGED_IN
          ) {
            clearInterval(intervalHandle);
            window.removeEventListener('message', handlePostMessage);

            resolve({
              status: event.data.type,
              message: event.data.type === this.postMessageEvents.LOGIN_SUCCESS
                  ? 'success'
                  : 'already logged in'
            });
          }
        }.bind(this),
        false
      );
    });
  }

  logout(data: LogoutData): void {
    const message: any = {
      type: this.postMessageEvents.LOGOUT,
      hash: data.hash
    };

    if (data.userId) {
      message.userId = data.userId;
    }

    if (data.username) {
      message.username = data.username;
    }

    this.postMessage(message);
  }

  logoutCB(data: LogoutCbData): void {
    const intervalHandle = setInterval(() => {
      this.postMessage({type: this.postMessageEvents.LOGOUT_CB});
    }, 1000);

    window.addEventListener('message', event => {
      /* validates the origin to be from a chat */
      if (!this.validateChatOrigin(event.origin)) {
        return;
      }

      /* expecting an object */
      if (typeof event.data !== 'object') {
        return;
      }

      /* different chat callback */
      if (event.data.hash !== data.hash) {
        return;
      }

      /* callback registered */
      if (event.data.type === this.postMessageEvents.LOGOUT_CB_RECEIVED) {
        clearInterval(intervalHandle);
        return;
      }

      /* validate event type */
      if (event.data.type !== this.postMessageEvents.LOGOUT_CB) {
        return;
      }

      data.callback(event.data.reason);
    }, false);
  }

  openPrivateChat(data: OpenPrivateChatData): void {
    const message: any = {
      type: this.postMessageEvents.OPEN_PRIVATE_CHAT,
      hash: data.hash
    };

    if (data.userId) {
      message.userId = data.userId;
    }

    if (data.username) {
      message.username = data.username;
    }

    this.postMessage(message);
  }

  postMessage(data) {
    try {
      const target = this.iframe instanceof HTMLIFrameElement
        ? this.iframe.contentWindow
        : this.iframe;
      target.postMessage(data, `https://${this.server}`);
    } catch (error) {
      console.log(error.name, error.message);
    }
  }

  trim(str: string): string {
    return str.replace(/^\s+|\s+$/g, '');
  }

  validateUsername(username: string): boolean {
    return !/^-?\d+$/.test(username) && username.length < 64;
  }

  validatePassword(password: string): boolean {
    return 0 < password.length && password.length < 51;
  }

  validateUrl(url: string): boolean {
    return /(https?:)?\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(url);
  }

  /**
   * checks if the given origin is of a chat service
   * @param origin - the URL of the origin
   * returns boolean
   */
  validateChatOrigin(origin): boolean {
    return /^https:\/\/.+\.rumbletalk\.(net|com)(:4433)?$/.test(origin);
  }
}
