import React, { useEffect, useState } from 'react'
import ProductsServices from '../../services/products';
import CartServices from '../../services/cart';
import { useNavigate } from 'react-router';

const useProduct = (productId) => {
    const [product, setProduct] = useState();
    const [commentaries, setCommentaries] = useState();
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getProduct = async (idProduto) => {
        try {
            const response = await ProductsServices.GetProduct(idProduto);
            setProduct(response);
        } catch (error) {

        }
    }

    const addToCart = async (idProduto, quantity) => {
        setLoading(true);
        if (!logged)
            return navigate("/login?redirect=1");
        
        try {
            const response = await CartServices.AddCart(idProduto, quantity);
            // setProduct(response);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const getData = async (idProduto) => {
        setLoading(true);
        try {
            await Promise.all([getProduct(idProduto)])
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token)
            setLogged(true);
        if (productId && Number(productId) > 0) {
            getData(productId);
        }
    }, [productId])

    return { product, addToCart, logged, loading, commentaries }
}

export default useProduct