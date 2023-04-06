import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";

import CreatableSelect from "react-select/creatable";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";

import { NoteData, NoteFormProps, Tag } from "components/Note/Note.types";

export default function NoteForm({
	onSubmit,
	addTag,
	availableTags,
	title = "",
	body = "",
	tags = [],
}: NoteFormProps & Partial<NoteData>) {
	const navigate = useNavigate();
	const titleRef = useRef<HTMLInputElement>(null);
	const bodyRef = useRef<HTMLTextAreaElement>(null);

	const [isValidForm, setIsValidForm] = useState(false);
	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

	const inEditMode = Boolean(title && body && tags);

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

	const handleCreateOption = (label: string) => {
		const newTag = { id: uuidv4(), label };
		addTag(newTag);
		setSelectedTags((prevTags) => {
			return [...prevTags, newTag];
		});
	};

	const handleSubmit = (e: any) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}
		setIsValidForm(true);

		onSubmit({
			// fields are required
			title: titleRef.current!.value,
			body: bodyRef.current!.value,
			tags: selectedTags,
		});

		if (inEditMode) navigate("..");
	};

	return (
		<Form noValidate validated={isValidForm} onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					{/* Title */}
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								ref={titleRef}
								defaultValue={title}
								required
								placeholder="Enter the note title"
							/>
							<Form.Control.Feedback type="invalid">
								Please provide a title.
							</Form.Control.Feedback>
						</Form.Group>
					</Col>

					{/* Tag Select */}
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<CreatableSelect
								isMulti
								options={renderTagOptions}
								value={valueTag}
								onCreateOption={handleCreateOption}
								onChange={handleChangeTags}
							/>
						</Form.Group>
					</Col>
				</Row>

				{/* Markdown Body */}
				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control
						ref={bodyRef}
						defaultValue={body}
						required
						as="textarea"
						rows={15}
					/>
					<Form.Control.Feedback type="invalid">
						Please provide a body.
					</Form.Control.Feedback>
				</Form.Group>

				{/* Buttons */}
				<Stack direction="horizontal" gap={2} className="justify-content-end">
					<Button type="submit" variant="primary">
						{inEditMode ? "Update" : "Add"}
					</Button>
					{/* NOTE: using `..` notation will send the user back to previous page */}
					<Link to="..">
						<Button type="button" variant="outline-secondary">
							Cancel
						</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	);
}
