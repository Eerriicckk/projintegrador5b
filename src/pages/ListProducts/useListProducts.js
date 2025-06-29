import { useEffect, useState } from 'react'
import ProductsServices from '../../services/products';
import CartServices from '../../services/cart';
import { useNavigate } from 'react-router';
import { isAdminInToken, isTokenExpired } from '../../utils/functions';

const useListProducts = (queryParams = new URLSearchParams()) => {
    const [searchTerm, SetSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [manageProductInfo, setManageProductInfo] = useState({
        anchorEl: null,
        open: false,
        id: null,
        name: null,
        price: null,
        image: null,
        description: null,
        quantity: null,
    });

    const navigate = useNavigate();

    const handleOpenManageProduct = (e, productInfo) => {
        setManageProductInfo({
            anchorEl: e.currentTarget,
            open: true,
            id: productInfo.id,
            name: productInfo.name,
            price: productInfo.price,
            image: productInfo.image,
            description: productInfo.description,
            quantity: productInfo.quantity,
        })
    }
    const handleCloseManageProduct = () => {
        setManageProductInfo({
            anchorEl: null,
            open: false,
            id: null,
            name: null,
            price: null,
            image: null,
            description: null,
            quantity: null,
        })
    }

    const getData = async () => {
        setLoading(true);
        try {
            const result = await ProductsServices.GetProducts(searchTerm);
            setProducts(result);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    

    useEffect(() => {
        SetSearchTerm(queryParams.get('title') ? queryParams.get('title') : '');

    }, [queryParams])

    useEffect(() => {
        getData();
    }, [searchTerm])

    useEffect(() => {
        handleCloseManageProduct();
        const token = localStorage.getItem('authToken');
        if (token && !isTokenExpired(token)){
            setLogged(true);
            setIsAdmin(isAdminInToken(token));
        }
    }, [])

    const addToCart = async (idProduto) => {
        setLoading(true);
        if (!logged)
            return navigate("/login?redirect=1");

        try {
            await CartServices.AddCart(idProduto, 1);
            // setProduct(response);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    return { searchTerm, SetSearchTerm, products, logged, loading, getData, addToCart, isAdmin, handleOpenManageProduct, handleCloseManageProduct, manageProductInfo }
}

export default useListProducts