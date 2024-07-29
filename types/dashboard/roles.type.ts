export interface ResultRolesDto {
    id: number;
    name: string;
    code: string;
    created_at: Date;
    status: boolean;
    access: ResultAccessDto[];
  }
  
  export type CreateRoleDto = {
    name: string;
    code: string;
  };

  export type ResultAccessDto = {
    id: number;
    name: string;
  }
  