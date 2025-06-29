import React, { useEffect, useState } from 'react'
import ProductsServices from '../services/products';
import CartServices from '../services/cart';
import { useNavigate } from 'react-router';

const useCart = (productId) => {
    const [open, setOpen] = useState(false);
    const [anchor, setAnchor] = useState();

    const handleOpen = (e) => {
        setOpen(true);
        setAnchor(e.currentTarget);
    }

    const handleClose = (e) => {
        setOpen(false);
    }


    const [cartItens, setCartItens] = useState();

    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getProduct = async () => {
        try {
            const response = await CartServices.GetCart();
            setCartItens(response);
        } catch (error) {

        }
    }

    const removeFromCart = async (idProduto) => {
        
        setLoading(true);
        if (!logged)
            return navigate("/login?redirect=1");

        try {
            await CartServices.DeleteFromCart(idProduto, false);
            await getProduct();
            // setProduct(response);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const getData = async () => {
        setLoading(true);
        try {
            await Promise.all([getProduct()])
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token)
            setLogged(true);

        getData(productId);
    }, [])

    return { cartItens, removeFromCart, logged, loading, }
}

export default useCart