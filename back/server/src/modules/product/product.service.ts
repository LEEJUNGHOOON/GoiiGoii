// product.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './schemas/product.schema';
import { ProductDetail } from './schemas/product-detail.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(ProductDetail.name)
    private productDetailModel: Model<ProductDetail>,
  ) {}

  async createProduct(
    name: string,
    price: number,
    imageUrl: string,
    briefDesc: string,
    category: string,
    stock: number,
    description: string,
    detailImageUrl: string,
  ): Promise<void> {
    // 1. 먼저 상품(Product)을 저장
    const newProduct = new this.productModel({
      name,
      price,
      imageUrl,
      briefDesc,
      category,
    });
    const savedProduct = await newProduct.save();

    // 2. 저장된 상품의 ID를 사용하여 상세 정보(ProductDetail)를 저장
    const newProductDetail = new this.productDetailModel({
      productId: savedProduct._id,
      stock,
      description,
      detailImageUrl,
    });

    await newProductDetail.save();
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    if (category === 'All') {
      return this.productModel.find().exec();
    }
    return this.productModel.find({ category }).exec();
  }

  async findById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }
  async findByProductId(productId: string): Promise<ProductDetail> {
    const objectId = new Types.ObjectId(productId); // 문자열을 ObjectId로 변환
    return this.productDetailModel.findOne({ productId: objectId }).exec();
  }
}
