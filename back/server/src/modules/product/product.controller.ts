import { Body, Controller, Post, Get, Res, Query, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Response } from 'express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('createProduct')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ) {
    try {
      await this.productService.createProduct(
        createProductDto.name,
        createProductDto.price,
        createProductDto.imageUrl,
        createProductDto.briefDesc,
        createProductDto.category,
        createProductDto.stock,
        createProductDto.description,
        createProductDto.detailImageUrl,
      );
      res.status(200).json({ addProductAdminSuccess: true });
    } catch (err) {
      res.status(400).json({ addProductAdminSuccess: false, err });
    }
  }
  @Get('getAllProducts')
  async getAllProducts(@Res() res: Response) {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (err) {
      res.status(400).json({ success: false, err });
    }
  }
  @Get('category')
  async getProductsByCategory(
    @Query('category') category: string,
    @Res() res: Response,
  ) {
    try {
      const products =
        await this.productService.getProductsByCategory(category);
      res.status(200).json(products);
    } catch (err) {
      res.status(400).json({ success: false, err });
    }
  }
  @Get(':id')
  async getProductById(@Param('id') id: string, @Res() res: Response) {
    try {
      const product = await this.productService.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const productDetail = await this.productService.findByProductId(id);
      if (!productDetail) {
        return res.status(404).json({ message: 'Product detail not found' });
      }
      return res.status(200).json({
        ...product.toObject(),
        ...productDetail.toObject(),
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
  }
}
