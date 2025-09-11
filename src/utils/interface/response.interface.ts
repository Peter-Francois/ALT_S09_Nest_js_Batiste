export interface ResponseInterface<T extends Record<string, any> | null> {
  data: T;
  message: string;
}
