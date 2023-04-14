import { IsEmail, Length } from "class-validator";

export class CreateUserDTO {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  @IsEmail(undefined, { message: "The email is invalid" })
  email: string;

  @Length(8, 20, {
    message: "The password must be between 8 and 20 characters long",
  })
  password: string;
}
