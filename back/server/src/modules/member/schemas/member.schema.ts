import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Member extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ default: false }) // 기본값 false로 설정
  admin: boolean;

  @Prop({ type: [String], default: [] }) // 장바구니 배열 추가
  cart: string[];

  static id: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
