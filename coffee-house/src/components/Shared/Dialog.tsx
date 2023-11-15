import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

interface DeleteDialogProps {
  message: string;
  open: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

export default function DeleteDialog({ message, open, onCancel, onDelete }: DeleteDialogProps) {
  const handleConfirmDelete = () => {
    onDelete();
    onCancel();
  };

  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        {message}
      </DialogTitle>
      <DialogActions>
        <Button onClick={onCancel}>No</Button>
        <Button onClick={handleConfirmDelete} autoFocus>
          Yes, delete it.
        </Button>
      </DialogActions>
    </Dialog>
  );
};
