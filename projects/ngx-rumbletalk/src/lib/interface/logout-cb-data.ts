export interface LogoutCbData {
  hash: string;
  callback: (reason: string) => void;
}
