export class HttpResponseWrapper<T> {
    orderStatus(orderStatus: any): string {
      throw new Error('Method not implemented.');
    }
    private response?: T;
    private error:boolean;
    private responseMessage:string;
  orderDetails: any;
    constructor(error:boolean,message:string,response?:T){
        this.response=response;
        this.error=error;
        this.responseMessage=message;
    }
    public getResponse() {
        return this.response;
    }
    public getError() {
        return this.error;
    }
    public getResponseMessage() {
        return this.responseMessage;
    }
}
