import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({timestamps:true})

export class User{

    @Prop({required:true})
    username:string;

    @Prop({required:true, unique:true, message:"Duplicated Email"})
    email:string;

    @Prop({required:true})
    password:string;


    @Prop({required:true})
    confirmPassword:string;

    @Prop({required:false, default:null})
    profileImg:string;

    @Prop({ default: null })
    forgotPasswordToken: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
