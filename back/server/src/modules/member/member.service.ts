import * as bcrypt from 'bcrypt';
//해시값
const saltRounds = 10;
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from './schemas/member.schema';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MemberService {
  constructor(@InjectModel(Member.name) private memberModel: Model<Member>) {}

  async transformPassword(createMemberDto: CreateMemberDto): Promise<void> {
    //bcrypt and protect password
    createMemberDto.password = await bcrypt.hash(
      createMemberDto.password,
      saltRounds,
    );
    console.log(`Transformed password: ${createMemberDto.password}`); // 변환된 비밀번호 출력
    return Promise.resolve();
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    await this.transformPassword(createMemberDto);
    const createdMember = new this.memberModel(createMemberDto);
    return createdMember.save();
  }

  async findById(id: string): Promise<Member> {
    const result = await this.memberModel.findOne({ id }).exec();
    return result;
  }

  async findByEmail(email: string) {
    const result = await this.memberModel.findOne({ email }).exec();
    if (!result) {
      console.log(`result = ${result}`);
      return null;
    }
    return result;
  }
  async findOneById(id: string): Promise<Member | undefined> {
    return await this.memberModel.findOne({ id }).exec();
  }
  async addToCart(userId: string, productId: string): Promise<Member | null> {
    const member = await this.memberModel.findOne({ id: userId }).exec();
    if (!member) return null;

    // 중복된 상품 ID는 추가하지 않도록 처리
    if (!member.cart.includes(productId)) {
      member.cart.push(productId);
    }

    return member.save(); // 변경 사항 저장
  }
  async removeFromCart(userId: string, productId: string): Promise<string[]> {
    const member = await this.memberModel.findOne({ id: userId }).exec();
    if (!member) return null;

    // 장바구니에서 상품 ID 삭제
    member.cart = member.cart.filter((id) => id !== productId);

    await member.save(); // 변경 사항 저장
    return member.cart; // 업데이트된 장바구니 반환
  }
}
