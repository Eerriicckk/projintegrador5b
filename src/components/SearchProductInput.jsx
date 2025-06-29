import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';

const SearchProductInput = () => {
    const [searchTerm, SetSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const HandleSearchProduct = () => {
        if (searchTerm === '')
            navigate('/products');
        else
            navigate(`/products?title=${searchTerm}`);
    }
    return (

        <div className="input-group">
            <input className="form-control" value={searchTerm} onChange={(e) => SetSearchTerm(e.target.value)} disabled={loading} />
            <button className="btn btn-primary" onClick={HandleSearchProduct} disabled={loading}><SearchIcon /></button>
        </div>
    )
}

export default SearchProductInput