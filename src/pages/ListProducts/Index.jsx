import { useSearchParams } from "react-router-dom"
import useListProducts from "./useListProducts";
import Loading from "../../components/Loading";
import Grid from '@mui/material/Grid';
import Product from "./components/Product";
import { Box, Button, IconButton, Popover, Stack, Tooltip } from "@mui/material";
import CartDialog from "../../components/CartDialog";
import AddManageProduct from "./components/AddManageProduct";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

const ListProducts = () => {
    const [searchParams] = useSearchParams();
    const { products, logged, loading, addToCart, isAdmin, handleOpenManageProduct, handleCloseManageProduct, manageProductInfo, getData } = useListProducts(searchParams);
    const [open, setOpen] = useState(false);

    const handleCloseDialogCreateUpdate = () => {
        setOpen(false);
        handleCloseManageProduct();
    }

    const handleUpdate = async () => {
        try {
            await getData();
        } catch (error) {

        }
    }

    return (
        <div>
            {loading ? <Loading /> :
                <>
                    <Box className="container px-4 py-3">
                        <Grid container spacing={2}>
                            {products &&
                                products.map((product, id) => (
                                    <Product
                                        key={id}
                                        name={product.nome}
                                        id={product.id}
                                        price={product.preco}
                                        image={product.image}
                                        handleAddtoCart={() => addToCart(product.id)}
                                        handleOpen={(e) => handleOpenManageProduct(e, {
                                            id: product.id,
                                            name: product.nome,
                                            price: product.preco,
                                            image: product.image,
                                            description: product.descricao,
                                            quantity: product.estoque,
                                        })}
                                        isAdmin={isAdmin}
                                    />
                                ))
                            }
                        </Grid>
                    </Box>
                    <Popover
                        open={manageProductInfo.open}
                        anchorEl={manageProductInfo.anchorEl}
                        onClose={handleCloseManageProduct}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Stack
                            sx={{ width: '100px' }}
                        >
                            <Button onClick={() => setOpen(true)}>Modificar</Button>
                            <Button color="warning" onClick={() => alert(manageProductInfo.id + " deletado")}>Excluir</Button>
                        </Stack>
                    </Popover>
                    <AddManageProduct open={open} handleClose={() => handleCloseDialogCreateUpdate()} info={manageProductInfo} handleUpdate={() => handleUpdate()} />
                    {isAdmin &&
                        <Box sx={{ position: 'fixed', bottom: "60px", right: '1rem' }}>
                            <IconButton onClick={() => {
                                handleCloseDialogCreateUpdate();
                                setOpen(true);
                            }} style={{ padding: '0', borderRadius: '500px' }}>
                                <Tooltip title={"Adicionar produto"}>
                                    <AddIcon sx={{ height: '40px', width: '40px' }} />
                                </Tooltip>
                            </IconButton >
                        </Box>
                    }
                    <CartDialog />
                </>
            }
        </div>
    )
}
export default ListProducts