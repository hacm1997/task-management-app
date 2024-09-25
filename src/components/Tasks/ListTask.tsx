import { Button, Dropdown, IconButton, Menu, MenuButton, MenuItem, Stack, Table } from '@mui/joy'
import { useEffect, useState } from 'react'
import { getTasks } from '../../services/task/getTasks'
import { TaksType } from './types';
import { CloseRounded, MoreVert, SkipNextRounded, SkipPreviousRounded } from '@mui/icons-material'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import ReactPaginate from 'react-paginate';
import styles from './styles.module.css'
import { ButtonGroupActionTags } from '../utils/ButtonGroupActionTags';
import { FormModal } from '../utils/FormModal';
import { MdAdd } from "react-icons/md";
import AlertDialogModal from '../utils/AlertDialogModal';
import { toast } from 'sonner';
import { deleteTask } from '../../services/task/deleteTask';
import { changeCompelteTaskStatus } from '../../services/task/taskStatus';
import { BarSearch } from '../utils/BarSearch';

interface Props {
    filterCompleted: number | null
}

export const ListTask = ({ filterCompleted }: Props) => {
    const [tasks, setTasks] = useState<TaksType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)
    const [showAlert, setShowAlert] = useState(false)
    const [showModalForm, setShowModalForm] = useState(false)
    const [taskId, setTaskId] = useState(0)
    const [isCreate, setIsCreate] = useState(false)
    const [refreshData, setRefreshData] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [taskTile, setTaskTile] = useState('')
    const [serchText, setSerchText] = useState('')

    useEffect(() => {
        getTasks(currentPage, filterCompleted, serchText).then((res) => {
            setTasks(res.data)
            setTotalPage(res.last_page)
        }).catch((error) => {
            console.error(error)
        })
    }, [refreshData, currentPage, filterCompleted, serchText])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePageClick = (event: any) => {
        setCurrentPage(event.selected + 1)
    }

    const openModal = () => {
        setTaskId(0)
        setIsCreate(true)
        setShowModalForm(true)
    }

    const showDeleteMessage = (id: number, title: string) => {
        setShowAlert(!showAlert)
        setTaskId(id)
        setTaskTile(title)
    }

    const handleShowTaskEditor = (id: number) => {
        setIsCreate(false)
        setTaskId(id)
        setShowModalForm(true)
    }

    const handerDeleteTask = () => {
        deleteTask(taskId).then((res) => {
            if (res.message === "Unauthorized") {
                toast.error('No tienes permisos para realizar esta acción')
            } else {
                toast.success('Tarea eliminada correctamente')
            }
        }).catch(error => {
            console.error(error)
            toast.error('Ha ocurrido un error, no se puedo eliminar la tarea')
        })
    }

    const handerTaskStatus = (id: number, title: string, complete: boolean) => {
        if (complete) {
            changeCompelteTaskStatus(id, 1).then(() => {
                toast.success(`Se marcó la tarea ${title} como completada`)
                setRefreshData(!refreshData)
            }).catch(error => {
                console.error(error)
                toast.error('Ha ocurrido un error, no se puedo actualizar la tarea')
            })
        } else {
            changeCompelteTaskStatus(id, 0).then(() => {
                toast.success(`Se marcó la tarea ${title} como no completada`)
                setRefreshData(!refreshData)
            }).catch(error => {
                console.error(error)
                toast.error('Ha ocurrido un error, no se puedo actualizar la tarea')
            })
        }
    }

    return (
        <div className={styles.taskTable}>
            <div className={styles.subMenuTask}>
                <Button sx={{ color: 'white', backgroundColor: '#2fa0db' }} startDecorator={showModalForm ? <CloseRounded /> : <MdAdd fontSize={20} />} onClick={openModal} variant='soft'>
                    {'Nueva Tarea'}
                </Button>
                <div>
                    <BarSearch setSerchText={setSerchText} serchText={serchText} />
                </div>
            </div>
            <Stack mt={2} sx={{ backgroundColor: 'white', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.20)', borderRadius: '14px' }}>
                <Table aria-label="basic table">
                    <thead style={{ background: '#FFEEE5' }}>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Nombre</th>
                            <th style={{ textAlign: 'center' }}>Finaliza</th>
                            <th style={{ textAlign: 'center' }}>Completada</th>
                            <th className={styles.visibleCol} style={{ textAlign: 'center' }}>Última modificación</th>
                            <th style={{ textAlign: 'center' }}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? tasks?.map((item: TaksType) => (
                            <tr key={item.id}>
                                <td style={{ textAlign: 'center' }}>
                                    {item.title}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    {format(new Date(item.due_date), 'dd MMM yyyy', { locale: es })}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    {item.is_completed === 1 ? 'Si' : 'No'}
                                </td>
                                <td className={styles.visibleCol} style={{ textAlign: 'center' }}>
                                    {format(new Date(item.updated_at), 'dd MMM yyyy - hh:mm aaaa', { locale: es })}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <Dropdown>
                                        <MenuButton
                                            slots={{ root: IconButton }}
                                            slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
                                            sx={{
                                                alignSelf: 'flex-start'
                                            }}
                                        >
                                            <MoreVert />
                                        </MenuButton>
                                        <Menu placement="bottom-end">
                                            <MenuItem>
                                                <ButtonGroupActionTags
                                                    handleShowAlertDialog={() => showDeleteMessage(item.id, item.title)}
                                                    handleShowEdit={() => handleShowTaskEditor(item.id)}
                                                    iconDisableBlog={true}
                                                    handleCompleteStatus={() => { handerTaskStatus(item.id, item.title, true) }}
                                                    handleNotCompleteStatus={() => { handerTaskStatus(item.id, item.title, false) }}
                                                    completeStatus={item.is_completed}
                                                />
                                            </MenuItem>
                                        </Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        )) : null}
                    </tbody>
                </Table>
            </Stack>
            <div style={{ paddingTop: '20px' }}>
                <ReactPaginate
                    breakLabel="..."
                    pageCount={totalPage}
                    previousLabel={<SkipPreviousRounded />}
                    nextLabel={<SkipNextRounded />}
                    onPageChange={handlePageClick}
                    containerClassName={styles.paginationsBtns}
                    previousClassName={styles.prevBtn}
                    nextClassName={styles.nextBtn}
                    disabledClassName={styles.paginationsDisable}
                    activeClassName={styles.paginationsActive}
                />
            </div>
            <FormModal
                showAlertDialog={showModalForm}
                handleRefresh={() => setRefreshData(!refreshData)}
                handleShowAlertDialog={() => setShowModalForm(!showModalForm)}
                isCreate={isCreate}
                taskId={taskId}
            />
            <AlertDialogModal
                handleDeleteTask={() => {
                    handerDeleteTask()
                    setShowAlert(!showAlert)
                    setRefreshData(!refreshData)

                }}
                handleShowAlertDialog={() => setShowAlert(!showAlert)}
                showAlertDialog={showAlert}
                description={`¿Está seguro que desea eliminar la tarea ${taskTile.toUpperCase()}?`}
                primaryAction='Eliminar'
                secondaryAction='Cancelar'
                title='Eliminar Tarea'
                loadingStatus={loadingStatus}
                setLoadingStatus={setLoadingStatus}
            />
        </div>
    )
}
