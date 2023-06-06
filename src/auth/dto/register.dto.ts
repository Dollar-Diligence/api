import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
	@ApiProperty()
	userName: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	password: string;
}
