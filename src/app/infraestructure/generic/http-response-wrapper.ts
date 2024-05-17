export class HttpResponseWrapper<T> {
    private response?: T;
    private error:boolean;
    private responseMessage:string;
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
