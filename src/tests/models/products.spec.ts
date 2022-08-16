import { Product,ProductsModel  } from "../../models/products.model";
const productmodel = new ProductsModel()


describe("[+] Testing Product Model ",async()=>{
    const productToCreate:Product={
        product_name:"IPHONE 13 Pro Max",
        product_price:"1,100 $"
    }
    let createdProduct0:Product
    let createdProduct1:Product
    it("[+] Testing Existence of index ",()=>{
        expect(productmodel.index).toBeDefined()
    })
    it("[+] Testing Existence of show ",()=>{
        expect(productmodel.show).toBeDefined()
    })
    it("[+] Testing Existence of create ",()=>{
        expect(productmodel.create).toBeDefined()
    })
    it("[+] Testing Existence of update ",()=>{
        expect(productmodel.update).toBeDefined()
    })
    it("[+] Testing Existence of delete ",()=>{
        expect(productmodel.delete).toBeDefined()
    })

    beforeAll(async()=>{
        //Creating Another Product
    createdProduct0=await productmodel.create({
        product_name:"MacBook Pro M2",
        product_price:"2000 $"
    })    
    })

    it("[+] Testing Functionality Of Create ",async()=>{
        createdProduct1=await productmodel.create(productToCreate)
        expect(createdProduct1.product_name).toEqual(productToCreate.product_name)
        expect(createdProduct1.product_price).toEqual(productToCreate.product_price)
    })
    it("[+] Testing Functionality Of Index ",async()=>{
        const products=await productmodel.index()
        expect(products.length).toBe(2)
        expect(products[0].product_name).toEqual(createdProduct0.product_name)
        expect(products[0].product_price).toEqual(createdProduct0.product_price)
        expect(products[1].product_name).toEqual(createdProduct1.product_name)
        expect(products[1].product_price).toEqual(createdProduct1.product_price)
        
    })
    it("[+] Testing Functionality Of Show ",async()=>{
        const product=await productmodel.show(createdProduct0.product_id as string)
        expect(product.product_id).toEqual(createdProduct0.product_id)
        expect(product.product_name).toEqual(createdProduct0.product_name)
        expect(product.product_price).toEqual(createdProduct0.product_price) 
    }) 
    it ("[+] Testing Functionality Of Update ",async()=>{
       const productToUpdate :Product ={product_name:"DELL G5 ",product_id:createdProduct0.product_id ,product_price:"1000$"}
        const updatedProduct= await productmodel.update(productToUpdate)
        expect(updatedProduct.product_name).toEqual(productToUpdate.product_name)
        expect(updatedProduct.product_price).toEqual(productToUpdate.product_price)
    })

    it ("[+] Testing Functionality Of Delete ",async()=>{
        await productmodel.delete(createdProduct0.product_id  as string)
        const products=await productmodel.index()
        expect(products.length).toBe(1)
    })     

    afterAll(async()=>{ 
    //Deleteing The Another Product
      await productmodel.delete(createdProduct1.product_id  as string)
    })  
    
})