export interface ResultCountriesDto {
  id: number;
  name: string;
  ccid: string;
  created_at: Date;
  status: boolean;
}

export type CreateCountryDto = {
  name: string;
  ccid: string;
};
