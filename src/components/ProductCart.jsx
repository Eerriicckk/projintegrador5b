import { Grid, Box, Button, IconButton, Tooltip } from '@mui/material';
import { formatNumber } from "../utils/functions";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

// const CustomLink = ({ id, children }) => {
//     return (<Link style={{ textDecoration: 'none' }} to={`/product/${id}`}>{children}</Link>);
// }

const ProductCart = ({ name, price, id, image, quantity, isDialog, handleRemove }) => {

    return (
        <Grid size={{ xs: 12, sm: 4 }}>
            <Box
                className="rounded"
                // data-aos="zoom-in"
                sx={{
                    height: { xs: "100px", sm: '150px' },
                    width: { xs: "100%" },
                    padding: "5px",
                    border: "1px solid rgb(210, 210, 210)",
                    bgcolor: "whitesmoke"
                }}
            >
                <Grid container spacing={1} direction={{ xs: "row" }}>
                    <Grid size={{ xs: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Box sx={{ height: { xs: "92px", sm: "140px" }, width: { xs: "92px", sm: "140px" } }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "cover" }} src={image} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 5 }}>
                        <Box className='d-flex flex-column justify-content-center h-100' sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: { xs: '12px', sm: '16px' }, color: 'black', verticalAlign: 'center' }}>
                            <p>{name}</p>
                            <p style={{ fontWeight: 'normal' }}>Qtd. {quantity}</p>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 2 }} sx={{}}>
                        <Box className='d-flex flex-column justify-content-center h-100' sx={{ textAlign: 'left', py: '5px', color: 'gray', fontSize: { xs: '10px', sm: '14px' } }}>
                            R${formatNumber(price)}
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                        <Box className='d-flex flex-column justify-content-center h-100'>
                            <IconButton onClick={() => handleRemove()}>
                                <Tooltip title="Adicionar ao carrinho">
                                    <RemoveShoppingCartIcon />
                                </Tooltip>
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box >
        </Grid >
    )
}
export default ProductCart