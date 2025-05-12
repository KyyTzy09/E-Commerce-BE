export class HttpException extends Error{
    message: string;
    status : number;
    constructor(status : number, message : string) {
        super(message);
        this.message = message || "internal server error"
        this.status = status || 500
        Object.setPrototypeOf(this, HttpException.prototype)
    }
}