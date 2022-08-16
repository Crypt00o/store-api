import { Request,Response } from "express";
import { Product,ProductsModel } from "../models/products.model";
const productmodel=new ProductsModel()

const index =async(req:Request,res:Response):Promise<void>=>{
    try{
        const products:Array<Product>=await productmodel.index()
        res.status(200).json({products:products})
    }
    catch(err){
        res.status(400).json({"error":"error while getting Products "})
    }
    }

    const show=async(req:Request,res:Response):Promise<void>=>{
        try{
            const product_id =req.params.id as string
            const product=await productmodel.show(product_id)
            res.status(200).json({product:product})
        }
        catch(err){
            res.status(400).json({"error":"error while getting Product "})
        }
    }

    const create=async(req:Request,res:Response):Promise<void>=>{
        try{
            const product:Product={product_name:req.body.name,product_price:req.body.price}
            const productCreated=await productmodel.create(product)
            res.status(200).json({product:productCreated})
        }
        catch(err){
            res.status(400).json({"error":"error while Creating Product "})
            console.log(err)
        }
    }
    const update=async(req:Request,res:Response):Promise<void>=>{
        try{
            const product:Product={product_name:req.body.name,product_price:req.body.price,product_id:req.params.id}
            const productUpdated=await productmodel.update(product)
            res.status(200).json({product:productUpdated})
    
        }
        catch(err){
            res.status(400).json({"error":"error while Updateing Product "})
        }
    }

    const _delete =async(req:Request,res:Response):Promise<void>=>{
        try{
            const product_id =req.params.id as string
            const product=await productmodel.delete(product_id)
            if(product){
            res.status(200).json({message:"Product Deleted"})
            }
            else{
            res.status(400).json({"error":"Can,t Delete , Product Not Found"})
            }

        }
        catch(err){
            res.status(400).json({"error":"error while Deleting Product "})
        }
        }
        
        export {index,create,show,update,_delete}