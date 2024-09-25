import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import DialogActions from '@mui/joy/DialogActions'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import { CircularProgress } from '@mui/joy'
import React, { SetStateAction } from 'react'

interface Props {
  showAlertDialog: boolean
  handleShowAlertDialog: () => void
  handleDeleteTask: () => void
  title: string
  description: string
  primaryAction: string
  secondaryAction: string
  loadingStatus: boolean
  setLoadingStatus: React.Dispatch<SetStateAction<boolean>>
}

export default function AlertDialogModal({
  description,
  handleShowAlertDialog,
  primaryAction,
  secondaryAction,
  showAlertDialog,
  title,
  handleDeleteTask,
  loadingStatus
}: Props) {
  return (
    <Modal open={showAlertDialog} onClose={handleShowAlertDialog}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon color='primary' />
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {description}
        </DialogContent>
        <DialogActions>
          {
            loadingStatus === true ?
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <CircularProgress size="md" variant="soft" />
              </div>
              :
              <div>
                <Button variant="solid" onClick={() => handleDeleteTask()}>
                  {primaryAction}
                </Button>
                <Button variant="plain" onClick={handleShowAlertDialog}>
                  {secondaryAction}
                </Button>
              </div>
          }
        </DialogActions>
      </ModalDialog>
    </Modal>
  )
}