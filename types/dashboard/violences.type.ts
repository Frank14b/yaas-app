export type ResultViolenceDto = {
  id: number;
  ref: string;
  name: string;
  details: string;
  country: string;
  city: string;
  area: string;
  date_occured: Date;
  geo_location: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  type_id: number;
  created_by: number;
  flag_id: number;
  restricted: number;
  agent_id: number;
  spam: boolean;
  report_by: number;
  nature: string;
  natureLocation: string;
  users: UserViolenceDto;
  author: UserViolenceDto;
  types: ViolenceTypeDto;
  flags: ViolencesFlagDto;
  polls: ViolencePollsDto[];
  agent: UserViolenceDto;
};

export type UserViolenceDto = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  phone: string;
  country_code: string;
  email: string;
};

export type ViolenceTypeDto = {
  id: number;
  name: string;
  description: string;
};

export type ViolencesFlagDto = {
  id: number;
  name: string;
  priority: number;
  color: string;
  status: string;
};

export type ViolencePollsDto = {
  id: number;
  ref: string;
  details: string;
  second_details: string;
  status: string;
  violenceAuthor: string;
  datepoll: Date;
  recomand_by: string;
  created_at: Date;
  updated_at: Date;
  referal_ong_id: number;
  user_id: number;
  flag_id: number;
  pollmethod_id: number;
  recomand_ong_id: number | null;
  notice_id: number;
  source: string;
  etat_passing: string;
  transition: string;
  created_by: UserViolenceDto;
  methods: InvestigationMethodDto;
  recommand_by: ViolenceOrganizationDto | null;
  recommand_to: ViolenceOrganizationDto | null;
  files: [];
};

export type ViolenceOrganizationDto = {
  id: number;
  name: string;
  details: string;
  status: string;
};

export type InvestigationMethodDto = {
  id: number;
  name: string;
  details: string;
  status: string;
};

export type CreateViolenceDto = {
  user_id?: number | null;
  user?: {
    firstname: string;
    lastname: string;
    phone: number;
    email: string;
    age: number;
    address?: string;
    gender: string;
    profession?: string;
  };
  date_occured: string;
  country: string;
  city: string;
  details: string;
  type_id: number | null;
  flag_id: number | null;
  nature: string;
  natureLocation: string;
};

export interface ViolenceOptions {
  sources: Array<string>;
  transitions: Array<string>;
  etat_passing: Array<string>;
  locations: Array<string>;
  natures: Array<string>;
  authors: Array<string>;
  sourcePJrequired: {
    [x: string]: boolean;
  };
  victimGender: Array<string>;
  userOrientation: Array<string>;
  userMaritalStatus: Array<string>;
  userLivingArea: Array<string>;
}

export type ViolencesCountriesDto = {
  id: number;
  name: string;
  code: string;
};

export type UpdateViolenceDto = {
  id?: number;
  user_id?: number | null;
  user?: {
    firstname: string;
    lastname: string;
    phone: number;
    email: string;
  };
  date_occured: string;
  country: string;
  city: string;
  details: string;
  type_id: number | null;
  flag_id: number | null;
  nature: string;
  natureLocation: string;
};

export type CreateInvestigationDto = {
  notice_id: number;
  datepoll: string;
  details: string;
  second_details: string;
  recomand_ong_id?: number;
  referal_ong_id?: number;
  recomand_by?: string;
  flag_id: number;
  violenceAuthor: string;
  pollmethod_id: number;
  source: string;
};

export type UpdateInvestigationDto = {
  id?: number;
  notice_id: number;
  datepoll: string;
  details: string;
  second_details: string;
  recomand_ong_id?: number;
  referal_ong_id?: number;
  recomand_by?: string;
  flag_id: number;
  violenceAuthor: string;
  pollmethod_id: number;
  source: string;
};

export type ResultInvestigationDto = {
  id: number;
  ref: string;
  details: string;
  status: string;
  violenceAuthor: string;
  datepoll: Date;
  recomand_by: string;
  created_at: Date;
  updated_at: Date;
  referal_ong_id: number;
  user_id: number;
  flag_id: number;
  pollmethod_id: number;
  recomand_ong_id: number | null;
  notice_id: number;
  source: string;
  etat_passing: string;
  transition: string;
  created_by: UserViolenceDto;
  methods: InvestigationMethodDto;
  recommand_by: ViolenceOrganizationDto | null;
  recommand_to: ViolenceOrganizationDto | null;
  files: [];
};