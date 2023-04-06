import { ReactNode } from "react";
import { ModalDialogProps } from "react-bootstrap";

export interface DialogProps extends ModalDialogProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  closeText?: string;
}