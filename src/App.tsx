import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

/* Components */
import { Container } from "react-bootstrap";
import NoteFormPage from "pages/NoteFormPage";
import NoteListPage from "pages/NoteListPage";
import NoteLayout from "components/Note/NoteLayout";
import NoteDetails from "components/Note/NoteDetails";

/* Types */
import { RawNote, Tag } from "components/Note/Note.types";

/* Hooks */
import useLocalStorage from "hooks/useLocalStorage";

function App() {
	// TODO: Can be replaced with COntext API if app increases logic
	const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
	const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

	/* Array with all the notes with its tags */
	const notesWithTags = useMemo(() => {
		return notes.map((note) => {
			return {
				...note,
				tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
			};
		});
	}, [notes, tags]);

	const onDeleteNote = (noteId: string) => {
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
	};

	return (
		<Container className="my-4">
			<Routes>
				<Route
					path="/"
					element={
						<NoteListPage
							availableTags={tags}
							setAvailableTags={setTags}
							notes={notesWithTags}
							handleDeleteNote={onDeleteNote}
						/>
					}
				/>
				<Route
					path="/new"
					element={
						<NoteFormPage
							mode="create"
							notes={notes}
							setNotes={setNotes}
							tags={tags}
							setTags={setTags}
						/>
					}
				/>
				<Route path="/:noteId" element={<NoteLayout notes={notesWithTags} />}>
					<Route
						index
						element={<NoteDetails handleDeleteNote={onDeleteNote} />}
					/>
					<Route
						path="edit"
						element={
							<NoteFormPage
								mode="update"
								notes={notes}
								setNotes={setNotes}
								tags={tags}
								setTags={setTags}
							/>
						}
					/>
				</Route>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Container>
	);
}

export default App;
