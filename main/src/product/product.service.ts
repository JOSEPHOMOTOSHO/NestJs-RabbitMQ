import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, productDocument } from './product.model';
import {Model} from "mongoose"

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel:Model<productDocument>){}

    async getAllProducts():Promise<Product[]>{
        return await this.productModel.find().exec()
    }

    async createProduct(payload):Promise<Product>{
        return new this.productModel(payload).save()
    }
    
    async getSingleProduct(id):Promise<Product>{
        return this.productModel.findOne(id)
    }
    async updateProduct(id,payload):Promise<Product>{
        console.log(id,payload)
        return await this.productModel.findOneAndUpdate(id,payload)
    }

    async deleteProduct(id):Promise<void>{
         await this.productModel.deleteOne(id)
    }

}
