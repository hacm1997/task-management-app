import { Box, Button, DialogContent, DialogTitle, Divider, Input, Modal, ModalClose, ModalDialog, Textarea, Typography } from "@mui/joy"
import { useEffect, useState } from "react"
import { TaskDataType } from "../Tasks/types"
import { saveTasks } from "../../services/task/saveTask"
import { toast } from 'sonner'
import { getTasksById } from "../../services/task/getTaskById"
import { updateTask } from "../../services/task/updateTask"

interface Props {
    showAlertDialog: boolean
    handleShowAlertDialog: () => void
    handleRefresh: () => void
    taskId?: number
    isCreate?: boolean
}

export const FormModal = ({
    handleRefresh,
    taskId,
    showAlertDialog,
    handleShowAlertDialog,
}: Props) => {

    const [taskData, setTaskData] = useState<TaskDataType>({
        title: '',
        description: '',
        due_date: '',
        is_completed: false,
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskData({ ...taskData, [event.target.name]: event.target.value })
    }

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTaskData({ ...taskData, [event.target.name]: event.target.value })
    }

    const saveTask = () => {
        saveTasks(taskData).then(() => {
            handleShowAlertDialog()
            handleRefresh()
            toast.success('Tarea creada correctamente')
        }).catch((error) => {
            console.error(error)
            toast.error('No se puedo crear la tarea')
        })
    }

    useEffect(() => {
        if (taskId !== undefined && taskId !== null && taskId !== 0) {
            getTasksById(taskId).then((res) => {
                setTaskData(res)
            }).catch((error) => {
                console.error(error)
            })
        } else {
            setTaskData({
                title: '',
                description: '',
                due_date: '',
                is_completed: false,
            })
        }
    }, [taskId])

    const handlerUpdateShipping = () => {
        updateTask(taskId as number, taskData).then(() => {
            handleShowAlertDialog()
            handleRefresh()
            toast.success('Tarea actualizada correctamente')
        }).catch((error) => {
            console.error(error)
            toast.error('No se puedo actualizar la tarea')
        })
    }
    return (
        <Modal open={showAlertDialog} onClose={handleShowAlertDialog}>
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>
                    <ModalClose />
                    <Typography level='h4'>
                        Crear nueva tarea
                    </Typography>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}
                        mb={1}
                    >
                        <Typography>Nombre de la tarea</Typography>
                        <Input type='text' name='title' value={taskData.title} onChange={handleInputChange} required />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}
                        mb={1}
                    >
                        <Typography>Descripción</Typography>
                        <Textarea name='description' sx={{ minHeight: '120px' }} value={taskData.description} onChange={handleTextAreaChange} />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}
                        mb={1}
                    >
                        <Typography>Fecha de vencimiento</Typography>
                        <Input type='date' name='due_date' onChange={handleInputChange} value={taskData.due_date} required />
                    </Box>
                    <Divider />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end'
                        }}
                        mt={1}
                    >
                        {
                            taskId !== 0 ?
                                <Button onClick={handlerUpdateShipping}>Actualizar</Button>
                                :
                                <Button onClick={saveTask}>Guardar</Button>
                        }
                    </Box>
                </DialogContent>
            </ModalDialog>
        </Modal>
    )
}
