import { Order, OrderedProduct, OrdersModel } from '../../models/orders.model'
import { Product, ProductsModel } from '../../models/products.model'
import { User, UsersModel } from '../../models/users.model'
import { client } from '../../database'
const usermodel = new UsersModel()
const productmodel = new ProductsModel()
const ordermodel = new OrdersModel()

describe('[+] Testing Order Model ', async () => {
  let createdUser: User
  let createdProduct: Product
  let createdOrder0: Order
  let createdOrder1: Order
  it('[+] Testing Existence of index ', () => {
    expect(ordermodel.index).toBeDefined()
  })
  it('[+] Testing Existence of show ', () => {
    expect(ordermodel.show).toBeDefined()
  })
  it('[+] Testing Existence of create ', () => {
    expect(ordermodel.create).toBeDefined()
  })
  it('[+] Testing Existence of update ', () => {
    expect(ordermodel.update).toBeDefined()
  })
  it('[+] Testing Existence of delete ', () => {
    expect(ordermodel.delete).toBeDefined()
  })
  it('[+] Testing Existence of insertOrderedProduct', () => {
    expect(ordermodel.insertOrderedProduct).toBeDefined()
  })

  //Created User For Useing While Testing

  beforeAll(async () => {
    createdUser = await usermodel.create({
      email: 'crypto404@crypto.com',
      password: 'nopassword',
      first_name: '0x',
      last_name: 'Crypt00o'
    })
    createdProduct = await productmodel.create({
      product_name: 'MacBook Pro M2',
      product_price: '2000 $'
    })
  })

  it('[+] Testing Functionality Of Create ', async () => {
    //Creating Another Order
    createdOrder0 = await ordermodel.create({
      order_status: 'not Delieverd ',
      user_id: createdUser.user_id as string
    })

    const orderToCreate = { order_status: 'not Delieverd ', user_id: createdUser.user_id as string }
    createdOrder1 = await ordermodel.create(orderToCreate)
    expect(createdOrder1.order_status).toEqual(orderToCreate.order_status)
    expect(createdOrder1.user_id).toEqual(orderToCreate.user_id)
  })
  it('[+] Testing Functionality Of Index ', async () => {
    const orders = await ordermodel.index()
    expect(orders.length).toBe(2)
    expect(orders[0].order_status).toEqual(createdOrder0.order_status)
    expect(orders[0].user_id).toEqual(createdOrder0.user_id)
    expect(orders[0].order_id).toEqual(createdOrder0.order_id)
    expect(orders[1].order_status).toEqual(createdOrder1.order_status)
    expect(orders[1].user_id).toEqual(createdOrder1.user_id)
    expect(orders[1].order_id).toEqual(createdOrder1.order_id)
  })
  it('[+] Testing Functionality Of Show ', async () => {
    const order = await ordermodel.show(createdOrder0.order_id as string)
    expect(order.order_id).toEqual(createdOrder0.order_id)
    expect(order.user_id).toEqual(createdOrder0.user_id)
    expect(order.order_status).toEqual(createdOrder0.order_status)
  })
  it('[+] Testing Functionality Of Update ', async () => {
    const orderToUpdate: Order = {
      order_status: 'Delivered ',
      order_id: createdOrder0.order_id,
      user_id: createdUser.user_id as string
    }
    const updatedOrder = await ordermodel.update(orderToUpdate)
    expect(updatedOrder.order_status).toEqual(orderToUpdate.order_status)
  })

  it('[+] Testing Functionality Of Delete ', async () => {
    await ordermodel.delete(createdOrder1.order_id as string)
    const orders = await ordermodel.index()
    expect(orders.length).toBe(1)
  })
  it('[+] Testing Functionality Of insertOrderedProduct', async () => {
    const orderedProductToInsert: OrderedProduct = {
      quantity: 3,
      product_id: createdProduct.product_id as string,
      order_id: createdOrder0.order_id as string
    }
    const orderProduct: Order = await ordermodel.insertOrderedProduct(orderedProductToInsert)
    expect(orderProduct.order_id).toEqual(orderedProductToInsert.order_id)
  })

  afterAll(async () => {
    const connection = await client.connect()
    await connection.query(`DELETE FROM products_orders;`)
    await connection.query(`DELETE FROM orders;`)
    await connection.query(`DELETE FROM products;`)
    await connection.query(`DELETE FROM users;`)
    connection.release()
  })
})
