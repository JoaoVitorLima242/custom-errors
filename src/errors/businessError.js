import BaseError from "./base.js";

export default class BusinessError extends BaseError {
  constructor(message) {
    super({
      message,
      error: 'BusinessError'
    })
  }
}
