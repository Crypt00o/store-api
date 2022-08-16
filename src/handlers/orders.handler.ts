import { Request,Response } from "express";
import { Order,OrderedProduct,OrdersModel } from "../models/orders.model";
const ordermodel=new OrdersModel()

const index =async(req:Request,res:Response):Promise<void>=>{
    try{
        const orders:Array<Order>=await ordermodel.index()
        res.status(200).json({orders:orders})
    }
    catch(err){
        res.status(400).json({"error":"error while getting Orders "})
    }
    }
    const show=async(req:Request,res:Response):Promise<void>=>{
        try{
            const order_id =req.params.id as string
            const order=await ordermodel.show(order_id)
            res.status(200).json({order:order})
        }
        catch(err){
            res.status(400).json({"error":"error while getting Order "})
        }
    }
    const create=async(req:Request,res:Response):Promise<void>=>{
        try{
            const order:Order={order_status:req.body.status,user_id:req.body.user_id}
            const orderCreated=await ordermodel.create(order)
            res.status(200).json({order:orderCreated})
        }
        catch(err){
            res.status(400).json({"error":"error while Creating Order "})
            console.log(err)
        }
    }
    const update=async(req:Request,res:Response):Promise<void>=>{
        try{
            const order:Order={order_id:req.params.id,order_status:req.body.status,user_id:req.body.user_id}
            const orderUpdated=await ordermodel.update(order)
            res.status(200).json({order:orderUpdated})
    
        }
        catch(err){
            res.status(400).json({"error":"error while Updateing Order "})
        }
    }


    const _delete =async(req:Request,res:Response):Promise<void>=>{
        try{
            const order_id =req.params.id as string
            const order=await ordermodel.delete(order_id)
            if(order){
            res.status(200).json({message:"Order Deleted"})
            }
            else{
            res.status(400).json({"error":"Can,t Delete , Order Not Found"})
            }

        }
        catch(err){
            res.status(400).json({"error":"error while Deleting Order "})
            console.log(err)
        }
        }
    
        const insertOrderedProduct=async(req:Request,res:Response):Promise<void>=>{
            try{
                const orderedProduct:OrderedProduct={ 
                product_id:req.body.product_id as string,
                order_id:req.params.id as string,
                quantity: req.body.quantity as number,
                }
                const productOrdered= await ordermodel.insertOrderedProduct(orderedProduct)
                res.status(200).json({"product-ordered":productOrdered})

            }
            catch(err){
                res.status(400).json({"error":"error while Inserting OrderedProduct "})
            }
        }
        export {index,create,show,update,_delete,insertOrderedProduct}