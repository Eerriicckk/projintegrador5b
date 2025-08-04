import { instance } from './axiosInstance';

const ProductsServices = {
    GetProducts: async (productName = '') => {
        try {
            const response = await instance.get(`produtos${productName !== '' ? `?nome=${productName}` : ''}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error();
        }
    },
    GetProduct: async (productId) => {
        try {
            const response = await instance.get(`produtos${`?productId=${productId}`}`);
            return response.data[0];
        } catch (error) {
            console.error(error);
            throw new Error();
        }
    },
    GetCommentaries: async (productId) => {
        try {
            const response = await instance.get(`produtos/${productId}/comentarios`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error();
        }
    },
    AddCommentary: async (productId, commentary) => {
        try {
            const response = await instance.post(`produtos/${productId}/comentar`, { texto: commentary });

            return response;
        } catch (error) {
            console.error(error);
            // throw new Error;
        }
    },
    AddProduct: async (productInfo) => {
        console.log(productInfo)
        try {
            const response = await instance.post(`cadastrarProdutos`,
                {
                    "nome": productInfo.name,
                    "descricao": productInfo.description,
                    "image": productInfo.image,
                    "preco": productInfo.price,
                    "estoque": productInfo.quantity
                }
            );

            return response;
        } catch (error) {
            console.error(error);
            // throw new Error;
        }
    },
    UpdateProduct: async (productId, productInfo) => {
        console.log(productInfo)
        try {
            const response = await instance.put(`produto?productId=${productId}`,
                {
                    "nome": productInfo.name,
                    "descricao": productInfo.description,
                    "image": productInfo.image,
                    "preco": productInfo.price,
                    "estoque": productInfo.quantity
                }
            );

            return response;
        } catch (error) {
            console.error(error);
            // throw new Error;
        }
    },
    DeleteProduct: async (productId) => {
        try {
            const response = await instance.delete(`produto?productId=${productId}`);

            return response;
        } catch (error) {
            console.error(error);
            // throw new Error;
        }
    }
}
export default ProductsServices