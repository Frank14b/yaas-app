export type ResultUserDto = {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    phone: string;
    // role: UserRoleDto;
    country: string;
    city: string;
    created_at: Date;
    country_code: number;
    is_su_admin: boolean;
    is_admin: boolean;
}

export type UserRoleDto = {
    id: number;
    name: string;
}