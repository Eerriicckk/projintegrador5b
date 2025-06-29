import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import ProductsServices from '../../../services/products';
import Loading from '../../../components/Loading';

const AddManageProduct = ({ open, handleClose, info, handleUpdate }) => {

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState();
    const [description, setDescription] = useState();
    const [quantity, setQuantity] = useState();
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const handleCloseDialog = () => {
        if (loading)
            return;

        handleClose();
    }

    useEffect(() => {
        if (info) {
            if (info.id && info.id != null) {
                setId(info.id);
                setIsUpdate(true);
            }
            if (info.name && info.name != null) {
                setName(info.name);
                setIsUpdate(true);
            }
            if (info.price && info.price != null) {
                setPrice(info.price);
                setIsUpdate(true);
            }
            if (info.image && info.image != null) {
                setImage(info.image);
                setIsUpdate(true);
            }
            if (info.description && info.description != null) {
                setDescription(info.description);
                setIsUpdate(true);
            }
            if (info.quantity && info.quantity != null) {
                setQuantity(info.quantity);
                setIsUpdate(true);
            }
        }
    }, [open, info])

    const handleSubmit = async (event) => {
        event.preventDefault(); // Impede o recarregamento da página
        setLoading(true);

        try {

            const body = {
                name,
                price,
                image,
                description,
                quantity,
            }

            if (isUpdate) {
                await ProductsServices.UpdateProduct(info.id, body);
            } else {
                await ProductsServices.AddProduct(body);
            }
            await handleUpdate();
            handleCloseDialog();
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={() => handleCloseDialog()}
                fullWidth
                maxWidth={'90%'}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>
                        {(info && (info.id != null && info.id !== '')) ?
                            <>Atualizar produto <strong>{info?.name}</strong></>
                            :
                            <>Adicionar produto</>
                        }
                    </DialogTitle>
                    <DialogContent>
                        {loading ? <Loading />
                            :
                            <Stack>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Box sx={{ height: { xs: "92px", sm: "168px" }, width: { xs: "92px", sm: "168px" } }}>
                                        <img style={{ height: "100%", width: "100%", objectFit: "cover" }} src={image} />
                                    </Box>
                                </Box>
                                <label>
                                    Imagem
                                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required className="form-control" />
                                </label>
                                <label>
                                    Nome
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="form-control" />
                                </label>
                                <label>
                                    Valor
                                    <input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} required className="form-control" step={'0.01'} />
                                </label>
                                <label>
                                    Descrição
                                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required className="form-control" />
                                </label>
                                <label>
                                    Quantidade em estoque
                                    <input type="number" min={0} value={quantity} onChange={(e) => setQuantity(e.target.value)} required className="form-control" step={'1'} />
                                </label>
                            </Stack>
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" disabled={loading}>Salvar</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default AddManageProduct