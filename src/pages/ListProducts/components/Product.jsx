import { Link } from "react-router-dom"
import { Grid, Box, Button } from '@mui/material';
import { formatNumber } from "../../../utils/functions";

const CustomLink = ({ id, children }) => {
    return (<Link style={{ textDecoration: 'none' }} to={`/product/${id}`}>{children}</Link>);
}

const Product = ({ name, price, id, image, handleAddtoCart }) => {

    return (
        <Grid size={{ xs: 12, sm: 4 }}>
            <Box
                className="rounded"
                // data-aos="zoom-in"
                sx={{
                    height: { xs: "150px", sm: "350px" },
                    width: { xs: "100%" },
                    padding: "5px",
                    transition: "transform .2s",
                    border: "1px solid rgb(210, 210, 210)",
                    bgcolor: "whitesmoke",
                    "&:hover": {
                        transform: "scale(1.1)",
                    },
                }}
            >
                <Grid container spacing={0} direction={{ xs: "row", sm: "column" }}>
                    <Grid size={{ xs: 3, sm: 12 }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Box sx={{ height: { xs: "92px", sm: "168px" }, width: { xs: "92px", sm: "168px" } }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "cover" }} src={image} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 4, sm: 12 }}>
                        <CustomLink id={id}>
                            <Box sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: { xs: '16px', sm: '18px' }, color: 'black' }}>
                                <p>{name}</p>
                            </Box>
                        </CustomLink>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 12 }}>
                        <CustomLink id={id}>
                            <Box sx={{ textAlign: 'left', py: '5px', color: 'gray' }}>
                                R${formatNumber(price)}
                            </Box>
                        </CustomLink>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 12 }}>
                        <Box>
                            <Button onClick={() => handleAddtoCart()} variant="contained">Adicionar ao carrinho</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box >
        </Grid >
    )
}
export default Product