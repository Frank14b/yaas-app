export interface ResultLoginDto {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
}

export type AuthDto = {
    email: string;
    password: string;
}