export interface ResponseInterfaceWithoutData {
  message: string;
}
export interface ResponseInterface<T extends Record<string, any>>
  extends ResponseInterfaceWithoutData {
  data: T;
}
