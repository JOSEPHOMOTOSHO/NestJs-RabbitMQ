import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private productService:ProductService,
         @Inject("PRODUCT_SERVICE") private readonly client:ClientProxy
    ){}

    @Get()
    async getAllProducts():Promise<Product[]>{
        return await this.productService.getAllProducts()
    }

    @Post()
    async createProduct(@Body() payload):Promise<Product>{
        const product = await this.productService.createProduct(payload)
        this.client.emit('product_created', product)
        return product
    }

    @Get("/:id")
    async getSingleProduct(@Param() id):Promise<Product>{
        return await this.productService.getSingleProduct(id)
    }

    @Put("/:id")
    async updateSingleProduct(@Param() id:number, @Body() payload):Promise<Product>{
        await this.productService.updateSingleProduct(id,payload)
        const product = await this.productService.getSingleProduct(id)
        this.client.emit('product_updated', product)
        return product
    }

    @Delete("/:id")
    async deleteProduct(@Param() id:string):Promise<void>{
        await this.productService.deleteProduct(id)
        this.client.emit('product_deleted', id )
    }

    @Post('/:id/like')
    async like(@Param() id){
        console.log(typeof id.id)
        const product = await this.productService.getSingleProduct(id.id)
        return this.productService.updateSingleProduct(id,{
            likes:product.likes+1
        })
    }


}
