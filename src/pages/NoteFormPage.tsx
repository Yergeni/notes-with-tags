import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import { Button, Stack } from "react-bootstrap";
import { ChevronLeft } from "react-bootstrap-icons";
import NoteForm from "components/Note/forms/NoteForm";

import { NoteData, RawNote, Tag } from "../components/Note/Note.types";
import { useNote } from "hooks/useNote";

type NoteFormPageProps = {
	mode: "create" | "update";
	notes: RawNote[];
	setNotes: React.Dispatch<React.SetStateAction<RawNote[]>>;
	tags: Tag[];
	setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
};

export default function NoteFormPage({
	mode = "create",
	setNotes,
	tags,
	setTags,
}: NoteFormPageProps) {
	const note = useNote();
	const navigate = useNavigate();

	const onCreateNote = ({ tags, ...rest }: NoteData) => {
		setNotes((prevNotes) => {
			return [
				...prevNotes,
				{
					...rest,
					id: uuidv4(),
					tagIds: tags.map((tag) => tag.id),
				},
			];
		});
	};

	const onUpdateNote = (noteId: string, { tags, ...rest }: NoteData) => {
		setNotes((prevNotes) => {
			return prevNotes.map((note) => {
				if (note.id === noteId) {
					return { ...note, ...rest, tagIds: tags.map((tag) => tag.id) };
				} else {
					return note;
				}
			});
		});
	};

	const addTag = (tag: Tag) => {
		setTags((prevTags) => [...prevTags, tag]);
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
			<h1 className="mb-4">New Note</h1>
			{mode === "create" ? (
				<NoteForm
					onSubmit={onCreateNote}
					addTag={addTag}
					availableTags={tags}
				/>
			) : (
				<NoteForm
					onSubmit={(data) => onUpdateNote(note.id, data)}
					addTag={addTag}
					availableTags={tags}
					title={note.title}
					body={note.body}
					tags={note.tags}
				/>
			)}
		</>
	);
}
