# NgxRumbletalk

An angular library for Rumbletalk chat users

## Installation

Using npm:

`npm i ngx-rumbletalk`

## Setup

**Import** `NgxRumbletalkModule` to your application's module

```typescript
import { NgxRumbletalkModule } from 'ngx-rumbletalk';

@NgModule({
  ...
  imports: [ NgxRumbletalkModule ],
  ...
})
export class AppModule { }
```

## Component usage

Use this in any of your `html` file where you would like to place the chat

### Basic use
```typescript
<ngx-rumbletalk [hash]="hash" [width]="700" [height]="500"></ngx-rumbletalk>
```

### Floating
```typescript
<ngx-rumbletalk [hash]="hash" [floating]="true" [side]="'right'" [image]="'https://d1pfint8izqszg.cloudfront.net/images/toolbar/toolbar.png'" [counter]="'14:23'">
</ngx-rumbletalk>
```

| Option            | Type                           | Default                       | Description
| ----------------- | ------------------------------ | ----------------------------- | -------------------------------------------------------------------------------------------- |
| hash              | string                         |                               | The hash string which defines the chat to be loaded
| width             | number                         | **700** if *floating* is true | Size of the width of the chat in pixels
| height            | number                         | **500** if *floating* is true | Size of the height of the chat in pexels
| floating          | boolean                        | false                         | Displays the chat in a floating manner or else it is fixed
| side              | string                         | right                         | Sets which side of the window will the floating chat be displayed, can only be either 'left' or 'right'. Effect can only be seen if *floating* is set to *true*
| image             | string                         | https://d1pfint8izqszg.cloudfront.net/images/toolbar/toolbar.png | Image used for the floating chat. Effect can only be seen if *floating* is set to *true*
| counter           | string                         | '14:23'                       | Top:Left coordinates of the counter/number of users in the chat. Effect can only be seen if *floating* is set to *true*

## Service usage

These are the available methods you can use in the chat by importing the `NgxRumbleTalkService` file

> Note: Don't forget to import the service and interfaces `import { LoginData, LogoutData, LogoutCbData, NgxRumbletalkService } from 'ngx-rumbletalk';` in the file you are working on and inject it in your class constructor `constructor(private rumbletalkService: NgxRumbletalkService) {}`

### Methods

#### login(data: LoginData): Promise<any>

```typescript
this.rumbletalkService.login(data).then(response => console.log(response)).catch(error => console.log(error));
```

Use to login to your chat

#### logout(data: LogoutData): void

```typescript
this.rumbletalkService.logout(data);
```

Use to logout from your chat

#### logoutCB(data: LogoutCbData): void

```typescript
this.rumbletalkService.logoutCB(data);
```

Use to logout from your chat but with callback that you can use for whatever purpose

## Interface

### LoginData

```typescript
export interface LoginData {
  hash: string;
  username: string;
  password?: string;
  image?: string;
  forceLogin?: boolean;
}
```

### LogoutData

```typescript
export interface LogoutData {
  hash: string;
  userId?: string;
  username?: string;
}
```

### LogoutCbData

```typescript
export interface LogoutCbData {
  hash: string;
  callback: any;
}
```