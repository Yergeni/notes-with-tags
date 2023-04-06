import NoteList from "components/Note/NoteList";

import { NoteListProps } from "components/Note/Note.types";

export type NoteListPageProps = NoteListProps;

export default function NoteListPage(props: NoteListPageProps) {
	return <NoteList {...props} />;
}
