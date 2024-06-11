import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// import { Response, Request } from 'express';
import { Response, Request } from 'express';  

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)  private userModel:Model<User>,
    private jwtService:JwtService
  
  ){}

  //Register User 

  async create(createAuthDto: CreateAuthDto){
    const {username, email, password, confirmPassword} = createAuthDto;

    const isUserExist = await this.userModel.findOne({email:email})

    if(isUserExist){
      throw new UnauthorizedException("User with this email already exist")

    }
    if (password !== confirmPassword){
      throw new UnauthorizedException("Both Password do not match")

    }
    const hashedPassword = await bcrypt.hashSync(password,10)
    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
      confirmPassword,
      
    }
    )
    const token = this.jwtService.sign({id:user._id})

    return {user, token}
    



  }

  // Login 

  async login(body:LoginDto){
    const { username, password } = body;
    console.log('Login request body:', body);

    // Checking whether user with this username exists or not
    const user = await this.userModel.findOne({ username:username });
    // console.log('User found:', user);

    if (!user) {
      console.error('Invalid Username or Password');
      throw new UnauthorizedException('Invalid Username Or Password');
    }

    // Compare plaintext password with hashed password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    // console.log('Password match result:', isPasswordMatched);

    if (!isPasswordMatched) {
      console.error('Invalid Username or Password');
      throw new UnauthorizedException('Invalid Username Or Password');
    }

    // Generate JWT tokens
    const payload = {
      username: user.email,
      sub: {
        name: user.username,
      },
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN,
      expiresIn: '7d',
    });

    // console.log('Access Token:', accessToken);
    // console.log('Refresh Token:', refreshToken);

    return { 
      user,
      backendTokens: {
        accessToken,  
        refreshToken,
      }
    };


  }

  // Refresh Token

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    return {

      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_TOKEN,
      })
    };
  }

  // async refreshToken(user:any){
  //   const payload = {
  //     username: user.username,
  //     sub: user.sub
  //   }
  //   const token = await this.jwtService.signAsync(payload)
  //   return {
  //     accessToken:token,
  //     refreshTokens:await this.jwtService.signAsync(payload, {
  //         secret:process.env.JWT_REFRESH_TOKEN,
  //         expiresIn:"7d"
  //       })
      
  //   }

  // }

  async getUser(req:Request){
   const jwt  = req.cookies["jwt"]
   if (!jwt) {
    throw new UnauthorizedException('No JWT token found');
  }

   const data = this.jwtService.verify(jwt);
   if(!data){
    throw new UnauthorizedException()
   }
   const user = await this.userModel.findById(data.id)
   if(user){
    const {password, ...result} = user;
    return result
   }
   throw new UnauthorizedException('User not found');

  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
