import { useEffect, useState } from 'react'
import ProductsServices from '../../services/products';
import CartServices from '../../services/cart';
import { useNavigate } from 'react-router';

const useListProducts = (queryParams = new URLSearchParams()) => {
    const [searchTerm, SetSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getData = async () => {
        setLoading(true);
        try {
            console.log(searchTerm)
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
        const token = localStorage.getItem('authToken');
        if (token)
            setLogged(true);
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

    return { searchTerm, SetSearchTerm, products, logged, loading, getData, addToCart }
}

export default useListProducts