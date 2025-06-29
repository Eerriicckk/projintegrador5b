import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip } from '@mui/material'
import useCommentary from '../useCommentary'
import AddCommentIcon from '@mui/icons-material/AddComment';

const Commentaries = ({ productId }) => {
    const { commentaries, loading, open, setOpen, logged, newCommentary, handleSetNewCommentary, handleSendCommentary } = useCommentary(productId);
    return (
        <>
            <Box sx={{ textAlign: "left", display:'flex', flexDirection:"row", justifyContent:"space-between" }}>
                <h3>Comentários</h3>
                {logged &&
                    <Button variant='contained' onClick={() => setOpen(true)}>
                        <Tooltip title="Adicionar comentário">
                            <AddCommentIcon />
                        </Tooltip>
                    </Button>
                }
            </Box>
            <Box>
                {commentaries && commentaries.map((commentary, id, commentaryL) => (
                    <Box id={id} sx={{ py: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", maxWidth: { xs: "100%", sm: "70%" } }}>
                            <span>
                                {commentary.nomeUsuario}
                            </span>
                            <span>
                                {new Date(commentary.dtCriacao).toLocaleString('pt-BR', { dateStyle: 'short' })}
                            </span>
                        </Box>
                        <hr />
                        <Box sx={{ textAlign: "left" }}>
                            {commentary.texto}
                        </Box>
                        {(commentaryL.length - 1 !== id) && <hr />}
                    </Box>
                ))}
            </Box>
            <Dialog onClose={() => setOpen(false)} open={open} fullWidth maxWidth={"90%"}>
                <DialogTitle>Adicionar comentário</DialogTitle>
                <DialogContent>
                    <TextField
                        multiline
                        maxRows={5}
                        value={newCommentary}
                        onChange={handleSetNewCommentary}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <span>{newCommentary.length} caracteres de 250</span>
                    <Button variant='contained' onClick={handleSendCommentary} disabled={newCommentary.length < 5 || loading}>Enviar</Button>
                </DialogActions>
            </Dialog>
        </ >
    )
}

export default Commentaries