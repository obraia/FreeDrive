class StatusException implements Error {
  name: string;
  message: string;
  status: number;

  constructor(message: string, status: number) {
    this.name = 'StatusException';
    this.message = message;
    this.status = status;
  }
}

export { StatusException };
