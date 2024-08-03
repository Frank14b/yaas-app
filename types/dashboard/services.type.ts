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
  booking_date: string;
  details: string;
  type_id: number;
  country: string;
  city: string;
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

export type ResultServiceTypeDto = {
  id: number;
  name: string;
  status: boolean;
  created_at: Date
};
