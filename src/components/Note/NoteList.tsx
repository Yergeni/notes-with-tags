import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import NoteCard from "./NoteCard";
import ReactSelect from "react-select";
import Dialog from "components/UI/Dialog";
import { Trash as DeleteIcon } from "react-bootstrap-icons"
import { Button, Col, Form, Row, Stack } from "react-bootstrap";

import { NoteListProps, Tag } from "./Note.types";

export default function NoteList({
	availableTags,
	setAvailableTags,
	notes,
	handleDeleteNote
}: NoteListProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [title, setTitle] = useState("");
	const [showTagsModal, setShowTagsModal] = useState(false);

	const handleClose = () => setShowTagsModal(false);
	const handleShow = () => setShowTagsModal(true);

	const filteredNotes = useMemo(() => {
		return notes.filter((note) => {
			return (
				(title === "" ||
					note.title.toLowerCase().includes(title.toLowerCase())) &&
				(selectedTags.length === 0 ||
					selectedTags.every((tag) =>
						note.tags.some((noteTag) => noteTag.id === tag.id)
					))
			);
		});
	}, [notes, title, selectedTags]);

	// Converts the available tags to the select options format
	const renderTagOptions = availableTags.map((tag) => ({
		label: tag.label,
		value: tag.id,
	}));

	// Converts the value from the tag to a Select value format
	const valueTag = selectedTags.map((tag) => ({
		label: tag.label,
		value: tag.id,
	}));

	// Converts the value from the Select to a Tag value that can be handled
	const handleChangeTags = (tags: any) => {
		setSelectedTags(
			tags.map((tag: any) => ({ label: tag.label, id: tag.value }))
		);
	};

	// Eediting tags
	const handleChangeSpecificTag = (
		id: string,
		label: string
	) => {
		setAvailableTags((prevTags) => {
			return prevTags.map((tag) => {
				if (tag.id === id) {
					return {...tag, label}
				}
				return tag;
			});
		});
	};

	const handleRemoveTag = (tagId: string) => {
		setAvailableTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
	};

	return (
		<>
			<Row className="align-items-center mb-4">
				<Col>
					<h1>Notes</h1>
				</Col>
				<Col xs="auto">
					<Stack gap={2} direction="horizontal">
						<Link to="/new">
							<Button variant="primary">Create</Button>
						</Link>
						<Button variant="outline-secondary" disabled={!Boolean(availableTags.length)} onClick={handleShow}>
							Edit Tags
						</Button>
					</Stack>
				</Col>
			</Row>

			<Form>
				<Row className="mb-4">
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<ReactSelect
								isMulti
								options={renderTagOptions}
								value={valueTag}
								onChange={handleChangeTags}
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>

			<Row className="g-3" xs={1} sm={2} md={3} lg={3} xl={4}>
				{filteredNotes.map(({ id, title, tags }) => {
					return (
						<Col key={id}>
							<NoteCard id={id} title={title} tags={tags} handleDeleteNote={handleDeleteNote} />
						</Col>
					);
				})}
			</Row>

			{/* Edit Tags Modal */}
			<Dialog open={showTagsModal} title="Edit Tags" onClose={handleClose}>
				<Form>
					<Stack gap={2}>
						{availableTags.map((tag) => {
							const { id, label } = tag;
							return (
								<Row key={id}>
									<Col >
										<Form.Control
											type="text"
											value={label}
											onChange={(e) => handleChangeSpecificTag(id, e.target.value)}
										></Form.Control>
									</Col>
									<Col xs="auto">
										<Button
											variant="outline-danger"
											onClick={() => handleRemoveTag(id)}
										>
											<DeleteIcon />
										</Button>
									</Col>
								</Row>
							);
						})}
					</Stack>
				</Form>
			</Dialog>
		</>
	);
}
