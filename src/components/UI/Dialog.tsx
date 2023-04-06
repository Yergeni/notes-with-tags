import { Button, Modal } from "react-bootstrap";
import { DialogProps } from "./types";

export default function Dialog({
	open,
	title,
	children,
	onClose,
	onConfirm,
	closeText = "Close",
	confirmText = "Confirm",
}: DialogProps) {
	return (
		<Modal show={open} onHide={onClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onClose}>
					{closeText}
				</Button>
				{onConfirm && (
					<Button variant="primary" onClick={onConfirm}>
						{confirmText}
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
}
