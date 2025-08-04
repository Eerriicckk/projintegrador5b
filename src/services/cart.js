import { instance } from './axiosInstance';

const CartServices = {
    AddCart: async (produtoId = 0, quantidade = 0) => {
        try {
            const response = await instance.post('adicionarNoCarrinho', { produtoId, quantidade });
            return response.data.token;
        } catch (error) {
            console.error(error);
            throw new Error();
        }
    },
    GetCart: async () => {
        try {
            const response = await instance.get(`carrinho`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error();
        }
    },
    DeleteFromCart: async (productId = 0, limpar = false) => {
        try {
            const response = await instance.delete(`carrinho?productId=${productId}&limpar=${limpar ? 1 : 0}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error();
        }
    }
}
export default CartServices