import { ConflictException, Injectable, NotFoundException, Request, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}
  async signUp(signUpDTO: SignUpDTO): Promise<{token: string}> {
    const { password } = signUpDTO;

    const existingUser = await this.usersService.getByEmail(signUpDTO.email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.createUser({
      ...signUpDTO,
      password: hashedPassword,
    })

    const token = this.jwtService.sign({ id: newUser.id });

    return { token };
  }

  async login(signUpDTO: LoginDTO): Promise<{token: string}> {
    const { email, password } = signUpDTO;

    const existingUser = await this.usersService.getByEmail(email);

    if (!existingUser) {
      throw new NotFoundException('User with this email does not exist');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({ id: existingUser.id });

    return { token };
  }
}