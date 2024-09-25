import { Box, DialogContent, DialogTitle, Divider, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy"
import { TaksDetailType } from "../Tasks/types"
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface Props {
    showAlertDialog: boolean
    handleShowAlertDialog: () => void
    task: TaksDetailType
}
export const TaskDetailModal = ({ task, showAlertDialog, handleShowAlertDialog }: Props) => {
    return (
        <Modal open={showAlertDialog} onClose={handleShowAlertDialog}>
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>
                    <ModalClose />
                    <Typography level='h4'>
                        Detalles
                    </Typography>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '30px'
                        }}
                        mb={1}
                    >
                        <div>
                            <Typography>Nombre de la tarea</Typography>
                            <p style={{ fontWeight: 700 }}>{task.title}</p>
                        </div>
                        <div>
                            <Typography>Estado</Typography>
                            <p style={{ fontWeight: 500 }}>{task.is_completed === 1 ?
                                <span style={{ color: 'green' }}>Completada</span>
                                :
                                <span style={{ color: 'red' }}>No completada</span>
                            }</p>
                        </div>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            paddingTop: '10px'
                        }}
                        mb={1}
                    >
                        <div>
                            <Typography>Descripción</Typography>
                            <p>{task.description}</p>
                        </div>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            paddingTop: '10px'
                        }}
                        mb={1}
                    >
                        <div>
                            <Typography>Fecha de finalización</Typography>
                            <p style={{ fontWeight: 600 }}>{task.due_date !== '' && format(new Date(task.due_date), 'dd MMM yyyy', { locale: es })}</p>
                        </div>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            paddingTop: '10px'
                        }}
                        mb={1}
                    >
                        <div>
                            <Typography>Última modificación</Typography>
                            <p>{task.updated_at !== '' && format(new Date(task.updated_at), 'dd MMM yyyy - hh:mm aaaa', { locale: es })}</p>
                        </div>
                    </Box>

                    <Divider />

                    <Box
                        sx={{
                            display: 'flex',
                            paddingTop: '10px'
                        }}
                        mb={1}
                    >
                        <div>
                            <Typography>Creada por: <strong>{task.user?.name}</strong></Typography>
                        </div>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            paddingTop: '10px'
                        }}
                        mb={1}
                    >
                        <div>
                            <Typography>Fecha de creación</Typography>
                            <p>{task.created_at !== '' && format(new Date(task.created_at), 'dd MMM yyyy - hh:mm aaaa', { locale: es })}</p>
                        </div>
                    </Box>
                </DialogContent>
            </ModalDialog>
        </Modal>
    )
}
