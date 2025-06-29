import { NavLink, useNavigate } from 'react-router-dom'
import SearchProductInput from './SearchProductInput';
import { useEffect, useState } from 'react';
import { isTokenExpired } from '../utils/functions';
import { Button, Tooltip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = () => {
    const [logged, setLogged] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            if (!isTokenExpired(token))
                setLogged(true);
            else {
                handleLogout();
            }
        } else
            setLogged(false);
    }, [logged, navigate])

    return (
        <>
            <div className="navbar navbar-expand-md bg-primary sticky-top border-bottom">
                <div className="container h-10">
                    <img className="img-fluid rounded" src="/Images/Logoloja.png" alt="logo" id="baitiLogo" style={{ maxWidth: "50px", marginRight:'5px' }} />
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"
                        aria-controls="offcanvas" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end bg-primary" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasLabel"><img src="/Images/Logoloja.png" alt="logo" style={{ maxWidth: "50px" }} /> EletrolUCS</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="d-flex align-items-center navbar-nav flex-grow-1 justify-content-between text-primary">
                                <li className="nav-item"><SearchProductInput /></li>
                                <li className="nav-item"><NavLink to="/"><span className="nav-link">Home</span></NavLink></li>
                                <li className="nav-item"><NavLink to="/products"><span className="nav-link">Produtos</span></NavLink></li>
                                <li className="nav-item">
                                    {logged ?
                                        <>
                                            <Button onClick={handleLogout} variant='text' sx={{ color: "black" }}><Tooltip title="Sair"><LogoutIcon /></Tooltip></Button>
                                        </>
                                        :
                                        <NavLink to="/login"><Tooltip title="Entrar" sx={{ color: "black" }}><LoginIcon /></Tooltip></NavLink>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar