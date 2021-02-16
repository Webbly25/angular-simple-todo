export interface Alert {
  id: number;
  type: 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'secondary' | 'light' | 'dark';
  message: string;
}
