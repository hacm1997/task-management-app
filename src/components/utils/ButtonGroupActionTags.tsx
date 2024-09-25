import { DeleteRounded, EditRounded, Visibility } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/joy'
import CheckIcon from '@mui/icons-material/Check';
import BlockIcon from '@mui/icons-material/Block';

interface Props {
  handleShowAlertDialog: (id?: string) => void
  handleShowEdit: (id?: string) => void
  handleShowDetails: (id?: string) => void
  handleCompleteStatus: (id?: string) => void
  handleNotCompleteStatus: (id?: string) => void
  iconDisableBlog?: boolean,
  completeStatus: number | boolean
}

export const ButtonGroupActionTags = ({ handleShowAlertDialog, handleShowEdit, handleShowDetails, handleCompleteStatus, handleNotCompleteStatus, completeStatus }: Props) => {
  return (
    <>
      <Tooltip title='Ver detalles' color='warning'>
        <IconButton size='md' color='warning' onClick={() => handleShowDetails()}>
          <Visibility fontSize='small' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Editar' color='primary'>
        <IconButton size='md' color='primary' onClick={() => handleShowEdit()}>
          <EditRounded fontSize='small' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Eliminar' color='danger'>
        <IconButton size='md' color='danger' onClick={() => handleShowAlertDialog()}>
          <DeleteRounded fontSize='small' />
        </IconButton>
      </Tooltip>
      <Tooltip title={completeStatus === 1 ? 'Marcar como no completada' : 'Marcar como completada'} color={completeStatus === 1 ? 'neutral' : 'success'}>
        <IconButton size='md' color={completeStatus === 1 ? 'neutral' : 'success'}
          onClick={() => { completeStatus === 1 ? handleNotCompleteStatus() : handleCompleteStatus() }}
        >
          {completeStatus === 1 ?
            <BlockIcon fontSize='small' />
            :
            <CheckIcon fontSize='small' />
          }
        </IconButton>
      </Tooltip>
    </>
  )
}
