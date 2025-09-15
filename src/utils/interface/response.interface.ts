export interface ResponseInterface<T extends Record<string, any>> {
  data?: T;
  message: string;
}
