import {
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  Component,
  ViewChild,
  ElementRef,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgxRumbletalkService } from './ngx-rumbletalk.service';

const protocol = 'https://';
const baseWebUrl = 'https://rumbletalk.com/';
const serviceRelativeUrl = 'client/service.php?hash=';
let server: string;
let messageInterval: any;
declare const window: any;

@Component({
  selector: 'ngx-rumbletalk',
  templateUrl: './ngx-rumbletalk.component.html',
  styleUrls: ['./ngx-rumbletalk.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxRumbletalkComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('iframe') iframeElement: ElementRef;
  @ViewChild('chatDiv') chatDivElement: ElementRef;
  @ViewChild('counter') counterElement: ElementRef;
  @Input() public hash: string;
  @Input() public width: number;
  @Input() public height: number;
  @Input() public floating = false;
  @Input() public side = 'right';
  @Input() public image = 'https://d1pfint8izqszg.cloudfront.net/images/toolbar/toolbar.png';
  @Input() public counter = 'false';

  mobile: boolean;
  cdn = 'https://d1pfint8izqszg.cloudfront.net/';
  counterTop = 14;
  counterLeft = 23;

  constructor(private service: NgxRumbletalkService) {}

  ngOnInit() {
    const ua = navigator.userAgent.toUpperCase();
    this.mobile = ua.indexOf('MOBILE') !== -1 || ua.indexOf('ANDROID') !== -1 || ua.indexOf('IOS') !== -1;

    if (this.floating) {
      if (!this.width) {
        this.width = 700;
      }

      if (!this.height) {
        this.height = 500;
      }

      if (this.side !== 'right' && this.side !== 'left') {
        this.side = 'right';
      }

      if (this.counter !== 'false') {
        const counterArr = this.counter.split(':');
        const counterTop = Number(counterArr[0]);
        const counterLeft = Number(counterArr[1]);

        if (!isNaN(counterTop)) {
          this.counterTop = counterTop;
        }

        if (!isNaN(counterLeft)) {
          this.counterLeft = counterLeft;
        }
      }
    }

    this.loadIframe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const hashVal = changes['hash'];

    if (hashVal.currentValue !== hashVal.previousValue) {
      this.reload();
    }
  }

  ngOnDestroy() {
    clearInterval(messageInterval);
  }

  /**
   * Loads the iframe
   */
  loadIframe(): void {
    this.service.address(this.hash).subscribe((address) => {
      server = address;

      if (!this.mobile) {
        this.iframeElement.nativeElement.src = `https://${address}/${this.hash}/`;
      }

      this.addListeners();
    });
  }

  /**
   * add the event listeners based on the embed type and device
   */
  addListeners(): void {
    window.addEventListener('message', this.info.bind(this), false);

    if (!this.mobile && this.floating) {
      window.addEventListener('keyup', this.escClose.bind(this), false);
    }
  }

  /**
   * hides the chat when the "Esc" key is clicked
   * @param {KeyboardEvent} event - the initiating event
   */
  escClose(event): void {
    if (event.key === 'Escape') {
      this.toggleFloatingChat(null, true);
    }
  }

  /**
   * handles postMessage requests
   * @param event - the event object
   */
  info(event) {
    if (isFinite(event.data)) {
      clearInterval(messageInterval);

      if (this.counter !== 'false') {
        this.counterElement.nativeElement.innerHTML = event.data.toString();
      }
    } else if (typeof event.data === 'object') {
      if (event.data.reload) {
        this.reload();
      }
    }
  }

  /**
   * reloads the iframe (or parent page) in case of a server request
   */
  reload() {
    const url = `${baseWebUrl}${serviceRelativeUrl}${this.hash}`;

    this.service.reload(url).subscribe(
      (res) => {
        if (res.status) {
          server = res.address;
          const address = `${protocol}${server}/${this.hash}/`;

          if (this.iframeElement.nativeElement instanceof HTMLIFrameElement) {
            this.iframeElement.nativeElement.src = address;
          } else {
            this.iframeElement.nativeElement.location.href = address;
          }
        }
      },
      (ignore) => {}
    );
  }

  /**
   * starts [repeatedly] trying to connect to the chat using postMessage
   */
  instantiateQuery() {
    messageInterval = setInterval(this.query.bind(this), 1000);
  }

  /**
   * instantiate a postppMessage connection with the chat
   */
  query() {
    try {
      let target;
      let origin;

      if (this.iframeElement.nativeElement instanceof HTMLIFrameElement) {
        target = this.iframeElement.nativeElement.contentWindow;
        origin = protocol + server;
      } else {
        target = this.iframeElement.nativeElement;
        origin = baseWebUrl;
      }

      target.postMessage('toolbar', origin);
    } catch (ignore) {}
  }

  /**
   * checks if the given origin is of a chat service
   * @param origin - the URL of the origin
   * returns boolean
   */
  validateOrigin(origin): boolean {
    return /^https:\/\/.+\.rumbletalk\.(net|com)(:4433)?$/.test(origin);
  }

  handleImageLoad(event: any): void {
    /* image element */
    const target = event.target;
    /* parent div */
    const parent = event.currentTarget.parentNode;

    /* match the dimensions of the image and the wrapping div */
    parent.style.height = `${target.height}px`;
    parent.style.width = `${target.width}px`;

    /* place the chat div right above the image */
    if (!this.mobile) {
      this.chatDivElement.nativeElement.style.bottom = `${target.height}px`;
    }
  }

  /**
   * hides or shows the floating chat
   * @param boolean [esc] - if set to true, will force hide
   */
  toggleFloatingChat(event: any = null, esc = false): void {
    if (event) {
      event.stopPropagation();
    }

    const chatDiv = this.chatDivElement.nativeElement;

    if (chatDiv.classList.contains('chat-div-in')) {
      chatDiv.classList.remove('chat-div-in');
      chatDiv.classList.add('chat-div-out');
      chatDiv.style.overflow = 'hidden';
    } else {
      if (esc) {
        return;
      }

      chatDiv.classList.remove('chat-div-out');
      chatDiv.classList.add('chat-div-in');
      chatDiv.style.overflow = 'visible';
    }
  }

  /**
   * attaches the open chat event to the given target
   * @param Element target
   */
  openChat(): void {
    const link = `${baseWebUrl}client/chat.php?${this.hash}`;
    let iframeInterval;
    const iframe = this.iframeElement;

    if (iframe) {
      iframe.nativeElement.focus();
    } else {
      const tempIframe = window.open(link);
      iframeInterval = setInterval(() => {
        if (tempIframe.closed) {
          clearInterval(iframeInterval);
        }
      }, 100);
    }
  }

  handleIframeLoad(): void {
    if (this.iframeElement && this.iframeElement.nativeElement) {
      this.service.iframe = this.iframeElement.nativeElement;
      this.service.server = server;
      this.service.handleResolve();
      this.instantiateQuery();
    }
  }

  handleIframeError(): void {
    this.service.handleReject('Iframe could not be loaded');
  }
}
