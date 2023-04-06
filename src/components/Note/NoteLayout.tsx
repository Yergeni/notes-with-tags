import { Navigate, Outlet, useParams } from "react-router-dom";
import { NoteLayoutProps } from "./Note.types";

export default function NoteLayout({ notes }: NoteLayoutProps) {
	const { noteId } = useParams();
	const note = notes.find((n) => n.id === noteId);

	if (!note) return <Navigate to="/" replace />;

	return <Outlet context={note} />;
}