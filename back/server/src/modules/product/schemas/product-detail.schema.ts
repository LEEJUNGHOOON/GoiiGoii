// product-detail.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// export type ProductDetailDocument = ProductDetail & Document;

@Schema()
export class ProductDetail extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  detailImageUrl: string;
}

export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);
