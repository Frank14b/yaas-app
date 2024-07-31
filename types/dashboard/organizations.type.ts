export interface ResultOrganizationDto {
  id: number;
  name: string;
  details: string;
  created_at: Date;
  status: boolean;
}

export type CreateOrganizationDto = {
  name: string;
  code: string;
};
