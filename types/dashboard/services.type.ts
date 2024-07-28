export interface ResultServiceDto {
  id: number;
  ref: string;
  details: string;
  created_at: Date;
  booking_date: Date;
  user: ServiceUserDto;
  agent: ServiceUserDto;
  status: boolean;
  type: ServiceTypeDto;
  country: string;
}

export type CreateServiceDto = {
  details: string;
  booking_date: Date;
  type_id: number;
};

export type ServiceUserDto = {
  id: number;
  firstname: string;
  lastname: string;
};

export type ServiceTypeDto = {
  id: number;
  name: string;
};
