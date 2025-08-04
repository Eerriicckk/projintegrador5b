import { useEffect, useState } from 'react'
import ProductsServices from '../../services/products';

const useCommentary = (productId) => {
    const [commentaries, setCommentaries] = useState();
    const [newCommentary, setNewCommentary] = useState('');
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSetNewCommentary = (e) => {
        setNewCommentary(e.target.value.substring(0, 250));
    }

    const handleSendCommentary = async () => {
        setLoading(true);
        try {
            await ProductsServices.AddCommentary(productId, newCommentary);
            await getCommentaries(productId);
            setOpen(false);
        } catch (error) {
            
        }finally{
            setLoading(false);
        }

    }

    const getCommentaries = async (idProduto) => {
        try {
            const response = await ProductsServices.GetCommentaries(idProduto);
            setCommentaries(response);
        } catch (error) {

        }
    }

    const getData = async (idProduto) => {
        setLoading(true);
        try {
            await Promise.all([getCommentaries(idProduto)])
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

    return { open, setOpen, logged, loading, commentaries, newCommentary, handleSetNewCommentary, handleSendCommentary }
}

export default useCommentary