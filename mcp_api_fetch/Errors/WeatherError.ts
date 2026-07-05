export class CityNotFoundError extends Error {
  constructor(city: string) {
    super(`Unable to fetch weather for "${city}".`);
    this.name = "CityNotFoundError";
  }
}
