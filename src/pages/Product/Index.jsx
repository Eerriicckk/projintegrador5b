import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useProduct from './useProduct';
import { Box, Button, Grid } from '@mui/material';
import { formatNumber } from '../../utils/functions';
import Loading from '../../components/Loading';
import Commentaries from './components/Commentaries';
import CartDialog from '../../components/CartDialog';
// import { useFetch } from '../hooks/useFetch';

const Product = () => {
    const { productId } = useParams();
    const { product, logged, addToCart, loading, commentaries } = useProduct(productId);
    const [quantity, setQuantity] = useState(1);

    const handleChangeQuantity = (event) => {
        if (event?.target?.value && Math.trunc(Number(event?.target?.value)) > 0)
            setQuantity(Math.trunc(Number(event.target.value)))
        else
            setQuantity(1)
    }
    return (
        <>
            <Box sx={{ bgcolor: "whitesmoke", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "30px", py: { xs: "10px", sm: "30px" } }}>
                {loading ? <Loading /> :
                    <>
                        {product &&
                            <>
                                <Box sx={{ bgcolor: "white", py: "20px", px: 5, width: { xs: "100%", sm: "90%" }, marginLeft: "auto", marginRight: "auto" }}>
                                    <Grid container spacing={0}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Box sx={{ height: { xs: "200px", sm: "300px" }, width: { xs: "200px", sm: "300px" } }}>
                                                    <img style={{ height: "100%", width: "100%", objectFit: "cover" }} src={product.image} />
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "grid" }}>
                                            {/* <Box>{product.nome}</Box> */}
                                            {/* <Box>{product.descricao}</Box> */}
                                            {/* <Box>{product.preco}</Box> */}
                                            <Box sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: { xs: '22px', sm: '33px' }, color: 'black' }}>
                                                <p>{product.nome}</p>
                                            </Box>
                                            <Box className="text-primary" sx={{ textAlign: 'left', py: '5px', fontSize: { xs: '20px', sm: '36px' } }}>
                                                R${formatNumber(product.preco)}
                                            </Box>
                                            <Box className="input-group feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3" sx={{ width: "90%" }}>
                                                <input className="form-control w-50" value={quantity} onChange={handleChangeQuantity} type='number' min={1} />
                                                <Button className='w-50' onClick={async () => { await addToCart(product.id, quantity) }} variant="contained">Comprar</Button>
                                            </Box>

                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{ bgcolor: "white", py: "20px", px: 5, textAlign: 'left', width: { xs: "100%", sm: "90%" } }}>
                                    <h3>Descrição do produto</h3>
                                    <hr />
                                    <p>{product.descricao}</p>
                                </Box>
                                <Box sx={{ bgcolor: "white", py: "20px", px: 5, width: { xs: "100%", sm: "90%" } }}>
                                    <Commentaries productId={product.id} />
                                </Box>
                                <CartDialog/>
                            </>
                        }
                    </>
                }
            </Box>
        </>
    )
}

export default Product