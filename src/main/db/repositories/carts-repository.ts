import { Cart } from '../schemas/carts-schema'

export async function getAll(): Promise<> {
    return await Cart.find()
}
