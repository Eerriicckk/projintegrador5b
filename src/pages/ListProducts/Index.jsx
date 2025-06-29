import { useSearchParams } from "react-router-dom"
import useListProducts from "./useListProducts";
import Loading from "../../components/Loading";
import Grid from '@mui/material/Grid';
import Product from "./components/Product";
import { Box } from "@mui/material";
import CartDialog from "../../components/CartDialog";

const ListProducts = () => {
    const [searchParams] = useSearchParams();
    const { products, logged, loading, addToCart } = useListProducts(searchParams);
    return (
        <div>
            {loading ? <Loading /> :
                <>
                    <Box className="container px-4 py-3">
                        <Grid container spacing={2}>
                            {products &&
                                products.map((product) => (
                                    <Product name={product.nome} id={product.id} price={product.preco} image={product.image} handleAddtoCart={() => addToCart(product.id)} />
                                ))
                            }
                        </Grid>
                    </Box>

                    <CartDialog />
                </>
            }
        </div>
    )
}
export default ListProducts