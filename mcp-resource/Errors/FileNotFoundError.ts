export class FileNotFoundError extends Error {
  constructor(file: string) {
    super(`The document ${file} is not found`);
    this.name = "FileNotFoundError";
  }
}
