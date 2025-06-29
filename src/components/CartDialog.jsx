import { Badge, Box, IconButton, Popper, Tooltip } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useCart from '../hooks/useCart';
import Loading from './Loading';
import ProductCart from './ProductCart';

const CartDialog = () => {
  const { loading, cartItens, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState();

  const handleOpen = (e) => {
    setOpen(!open);
    setAnchor(e.currentTarget);
  }

  const handleClose = (e) => {
    setOpen(false);
  }


  return (
    <>
      <Box sx={{ position: 'fixed', bottom: "5px", right: '1rem' }}>
        <Badge badgeContent={cartItens?.length} color="primary" anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
          <IconButton onClick={handleOpen} style={{ padding: '0', borderRadius: '500px' }}>
            <Tooltip title={"Ver carrinho"}>
              <ShoppingCartIcon sx={{ height: '40px', width: '40px' }} />
            </Tooltip>
          </IconButton >
        </Badge>
      </Box>
      <Popper
        open={open}
        anchorEl={anchor}
        placement='top-end'
        sx={{ position: 'fixed' }}
      >
        <Box
          className="rounded"
          sx={{
            bgcolor: 'white',
            minWidth: { xs: '200px', sm: '400px' },

            minHeight: { xs: '300px', sm: '500px' },
            maxHeight: { xs: '300px', sm: '500px' },

            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
            py: { xs: '5px' },
            px: '10px'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 'bold' }}>Carrinho</span>
            <IconButton onClick={handleClose} style={{ padding: '0', borderRadius: '500px' }}>
              <Tooltip title={"Fechar"}>
                <CloseIcon sx={{ height: '15px', width: '15px' }} />
              </Tooltip>
            </IconButton >
          </Box>
          <Box sx={{ maxHeight: { xs: '270px', sm: '470px' }, overflowY: 'scroll' }}>
            {loading ? <Loading /> :
              <>
                {(cartItens && cartItens.length > 0) ? cartItens.map((item, id) => (
                  <>
                    {item.nomeProduto}
                    <ProductCart name={item.nomeProduto} price={item.precoUnitario} quantity={item.quantidade} image={item.produtoImg} id={item.produtoId} handleRemove={() => removeFromCart(item.produtoId)} />
                  </>
                )) :
                  <p>Seu carrinho está vazio</p>
                }
              </>
            }
          </Box>
        </Box>
      </Popper>
    </>
  )
}

export default CartDialog