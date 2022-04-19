import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { HttpService } from '@nestjs/axios';

@Controller('products')
export class ProductController {
    constructor(private productService:ProductService, private HttpService:HttpService){}

    @Get()
    async getAllProducts():Promise<Product[]>{
        return await this.productService.getAllProducts()
    }


    @Post('/:id/like')
    async like(@Param() id){
        const product = await this.productService.getSingleProduct(id)
        try{
            await this.HttpService.post(`http://localhost:8000/api/products/${(""+product.id)}/like`).subscribe((res)=>{
                console.log(res);
            })
        }catch(err){
            console.log(err,"i am error")
        }
        
        return this.productService.updateProduct(id,{
            likes:product.likes+1
        })
    }

    @EventPattern('product_created')
    async createProduct(payload){
        console.log("beans")
        return await this.productService.createProduct(payload)
    }

    @EventPattern('product_updated')
    async updateProduct(payload){
        return await this.productService.updateProduct(payload.id,payload)
    }

    @EventPattern('product_deleted')
    async deleteProduct(id){
        return await this.productService.deleteProduct(id)
    }

    



}
