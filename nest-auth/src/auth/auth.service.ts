import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
    const {  username, password} = body;
    // Checking whether user with this email exists or not
    const user = await this.userModel.findOne({username:username})


    if(!user){
      throw new UnauthorizedException("Invalid Username Or Password");
    }
    // compare: This is a method provided by bcrypt for comparing a plaintext password with a hashed password. It takes two arguments:
// The first argument is the plaintext password (password) that the user provided during authentication.
// The second argument is the hashed password retrieved from your database (user.password).
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched){
      throw new UnauthorizedException("Invalid Username Or Password")
    }
    // this.jwtService ---------------  This service is responsible for signing and verifying JWT tokens.
    // The sign method then generates a JWT token by:
    //  Taking the payload object {id:user._id}.
    const payload = {
      username: user.email,
      // sub: This property represents the subject of the JWT, which in this case is the unique identifier (userId) of the user. It's often used to uniquely identify the user within the system or application.
      sub:{
        name:user.username
      }
    }

    const token = this.jwtService.sign(payload)

    return { user, 
    backendTokens:{
      accessToken:token,
      refreshToken:this.jwtService.sign(payload,{
        secret:process.env.JWT_REFRESH_TOKEN,
        expiresIn:"7d"
      })
    }  
    
    }


  }

  async refreshToken(user:any){
    const payload = {
      username: user.username,
      sub: user.sub
    }
    const token = await this.jwtService.signAsync(payload)
    return {
      accessToken:token,
      refreshToken:await this.jwtService.signAsync(payload, {
          secret:process.env.JWT_REFRESH_TOKEN,
          expiresIn:"7d"
        })
      
    }

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
