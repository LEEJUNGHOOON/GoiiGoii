import {
  Controller,
  Post,
  Body,
  Res,
  Param,
  Get,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { Response } from 'express';
import { ProductService } from '../product/product.service'; // ProductService 추가

interface ID {
  id: string | null;
}

interface AddCartDTO {
  productId: string;
  userId: string;
}

@Controller('member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly productService: ProductService,
  ) {}

  @Post('idCheck')
  async idCheck(@Body() memberId: ID, @Res() res: Response) {
    try {
      const hasId = await this.memberService.findById(memberId.id);
      console.log(hasId);
      if (hasId) {
        //아이디가 중복일때
        res.status(200).json({ idCheckSuccess: false });
      } else if (hasId == null) {
        res.status(200).json({ idCheckSuccess: true });
      }
    } catch (err) {
      res.status(400).json({ success: false, err });
    }
  }

  @Post('signin')
  async register(
    @Body() createMemberDto: CreateMemberDto,
    @Res() res: Response,
  ) {
    try {
      await this.memberService.create(createMemberDto);
      console.log(createMemberDto);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false, err });
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    try {
      const member = await this.memberService.findById(id);

      if (!member) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'User not found',
        });
      }

      return res.status(HttpStatus.OK).json(member);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error fetching user data',
        error: err.message,
      });
    }
  }
  @Post('add-to-cart')
  async addToCart(@Body() addCartDto: AddCartDTO, @Res() res: Response) {
    try {
      const { productId, userId } = addCartDto;
      const member = await this.memberService.addToCart(userId, productId);

      if (!member) {
        return res.status(HttpStatus.NOT_FOUND).json({
          addUserCartSuccess: false,
          message: 'User not found',
        });
      }

      return res.status(HttpStatus.OK).json({
        addUserCartSuccess: true,
        message: 'Product added to cart',
        cart: member.cart,
      });
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        addUserCartSuccess: false,
        message: 'Error adding product to cart',
        error: err.message,
      });
    }
  }
  @Get(':id/cart')
  async getUserCart(@Param('id') userId: string, @Res() res: Response) {
    try {
      const member = await this.memberService.findById(userId);
      if (!member) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'User not found',
        });
      }

      // 장바구니에 있는 상품들 찾기
      const productDetails = await Promise.all(
        member.cart.map((productId) => this.productService.findById(productId)),
      );

      return res.status(HttpStatus.OK).json({
        success: true,
        cartItems: productDetails,
      });
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error fetching cart items',
        error: err.message,
      });
    }
  }
  @Delete(':userId/cart/:productId')
  async removeFromCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Res() res: Response,
  ) {
    try {
      const updatedCart = await this.memberService.removeFromCart(
        userId,
        productId,
      );
      if (!updatedCart) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'User or Product not found',
        });
      }

      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Product removed from cart',
        cart: updatedCart,
      });
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error removing product from cart',
        error: err.message,
      });
    }
  }
}
