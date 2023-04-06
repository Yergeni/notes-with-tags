import { Link } from "react-router-dom";

import Dialog from "components/UI/Dialog";
import { Trash as DeleteIcon } from "react-bootstrap-icons"
import { Badge, Button, Card, Stack } from "react-bootstrap";

import { NoteCardProps } from "./Note.types";

import styles from "./NoteCard.module.css";
import { useState } from "react";

export default function NoteCard({
	id,
	title,
	tags,
	handleDeleteNote,
}: NoteCardProps) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleClose = () => setShowDeleteModal(false);
	const handleShow = () => setShowDeleteModal(true);

	return (
		<>
			<Card
				as={Link}
				to={`${id}`}
				border="secondary"
				className={`h-100 text-reset text-decoration-none ${styles.card}`}
			>
				<Card.Header>
					<Stack direction="horizontal">
						{title}
						<Button
							variant="outline-danger"
							size="sm"
							className="ms-auto rounded"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								handleShow();
							}}
						>
							<DeleteIcon />
						</Button>
					</Stack>
				</Card.Header>
				<Card.Body>
					<Stack
						gap={1}
						direction="horizontal"
						className="justify-content-center flex-wrap"
					>
						{tags.length ? (
							tags.map(({ id, label }) => (
								<Badge key={id} bg="primary" className="text-truncate">
									{label}
								</Badge>
							))
						) : (
							<Badge bg="secondary">No Tags added</Badge>
						)}
					</Stack>
				</Card.Body>
			</Card>

			{/* Delete Note Dialog */}
			<Dialog
				open={showDeleteModal}
				title="Delete Note"
				onClose={handleClose}
				onConfirm={() => handleDeleteNote(id)}
			>
				Are you sure you want to delete this note?
			</Dialog>
		</>
	);
}
