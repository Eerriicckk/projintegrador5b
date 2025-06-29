import { instance } from './axiosInstance';

const ProductsServices = {
    GetProducts: async (productName = '') => {
        try {
            const response = await instance.get(`produtos${productName !== '' ? `?nome=${productName}` : ''}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error;
        }
    },
    GetProduct: async (productId) => {
        try {
            const response = await instance.get(`produtos${`?productId=${productId}`}`);
            return response.data[0];
        } catch (error) {
            console.error(error);
            throw new Error;
        }
    },
    GetCommentaries: async (productId) => {
        try {
            const response = await instance.get(`produtos/${productId}/comentarios`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error;
        }
    },
    AddCommentary: async (productId, commentary) => {
        try {
            const response = await instance.post(`produtos/${productId}/comentar`, { texto: commentary });
            console.log(response)
            return response;
        } catch (error) {
            console.error(error);
            // throw new Error;
        }
    }
}
export default ProductsServices