export interface ResultViolenceDto {
  id: number;
  ref: string;
  details: string;
  created_at: Date;
  date_occured: Date;
  users: ViolenceUserDto;
  agent: ViolenceUserDto;
  created_by: ViolenceUserDto;
  status: boolean;
  nature: string;
  types: ViolenceTypeDto;
  flags: ViolenceFlagDto;
}

export type CreateViolenceDto = {
  details: string;
  date_occured: Date;
  nature: string;
};

export type ViolenceUserDto = {
  id: number;
  firstname: string;
  lastname: string;
};

export type ViolenceTypeDto = {
  id: number;
  name: string;
};

export type ViolenceFlagDto = {
  id: number;
  name: string;
};
