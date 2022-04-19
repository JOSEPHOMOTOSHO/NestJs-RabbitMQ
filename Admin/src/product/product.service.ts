import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly productRepository:Repository<Product>,
    ){}

    async getAllProducts():Promise<Product[]>{
        return await this.productRepository.find()
    }
    
    async createProduct(payload):Promise<Product>{
        return await this.productRepository.save(payload)
    }

    async getSingleProduct(id:number):Promise<Product>{
        return await this.productRepository.findOne(id)
    }

    async updateSingleProduct(id, payload):Promise<any>{
        return await this.productRepository.update(id.id, payload)
    }

    async deleteProduct(id:string):Promise<any>{
        return await this.productRepository.delete(id)
    }
}
