class ApiError extends Error {
  constructor(message, options) {
    super(message);
    this.name = "ApiError";
    this.status = options.status;
    this.details = options.details || null;
  }

  toString() {
    return `${this.name}: ${this.message}`;
  }
}

export default ApiError;
