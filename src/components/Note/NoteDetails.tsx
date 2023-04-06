import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* Components */
import Dialog from "components/UI/Dialog";
import ReactMarkdown from "react-markdown";
import { ChevronLeft } from "react-bootstrap-icons";
import { Badge, Col, Row, Stack, Button } from "react-bootstrap";

/* Hooks */
import { useNote } from "hooks/useNote";

/* Types */
import { NoteDetailsProps } from "./Note.types";

export default function NoteDetails({ handleDeleteNote }: NoteDetailsProps) {
	const navigate = useNavigate();
	const note = useNote();
	const { id, title, tags, body } = note;

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleClose = () => setShowDeleteModal(false);
	const handleShow = () => setShowDeleteModal(true);

	const onDeleteNote = () => {
		handleDeleteNote(id);
		navigate("/");
	};

	return (
		<>
			<Button
				variant="light"
				size="sm"
				onClick={() => navigate("-1")}
				className="mb-4"
			>
				<Stack direction="horizontal" gap={1}>
					<ChevronLeft />
					Go Back
				</Stack>
			</Button>

			<Row className="align-items-center mb-4">
				<Col>
					<h1>{title}</h1>
					{tags.length ? (
						<Stack
							gap={1}
							direction="horizontal"
							className="justify-content-start flex-wrap"
						>
							{tags.map(({ id, label }) => (
								<Badge key={id} bg="primary" className="text-truncate">
									{label}
								</Badge>
							))}
						</Stack>
					) : (
						<Badge bg="secondary">No tags added</Badge>
					)}
				</Col>
				<Col xs="auto">
					<Stack
						direction="horizontal"
						gap={2}
						className="justify-content-end flex-wrap"
					>
						<Link to={`/${note.id}/edit`}>
							<Button>Edit</Button>
						</Link>
						<Button variant="outline-danger" onClick={handleShow}>
							Delete
						</Button>
					</Stack>
				</Col>
			</Row>

			<Row>
				<Col>
					<ReactMarkdown>{body}</ReactMarkdown>
				</Col>
			</Row>

			{/* Delete Note Dialog */}
			<Dialog
				open={showDeleteModal}
				title="Delete Note"
				onClose={handleClose}
				onConfirm={onDeleteNote}
			>
				Are you sure you want to delete this note?
			</Dialog>
		</>
	);
}
