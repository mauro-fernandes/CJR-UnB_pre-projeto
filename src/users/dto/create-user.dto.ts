export class CreateUserDto {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  gender?: string;
  role?: string;
}
