export type Tag = {
	id: string;
	label: string;
};

export type NoteData = {
	title: string;
	body: string;
	tags: Tag[];
};

export type Note = {
	id: string;
} & NoteData;

/* For Local Storage */
export type RawNoteData = {
  title: string;
  body: string;
  tagIds: string[];
};

export type RawNote = {
  id: string;
} & RawNoteData

export type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  addTag: (data: Tag) => void;
  availableTags: Tag[];
}

export type EditNoteFormProps = {
  onSubmit: (noteId: string, data: NoteData) => void;
  addTag: (data: Tag) => void;
  availableTags: Tag[];
}

export type NoteDeleteProps = {
  handleDeleteNote: (noteId: string) => void;
}

export type NoteListProps = {
	notes: Note[];
	availableTags: Tag[];
  setAvailableTags: React.Dispatch<React.SetStateAction<Tag[]>>
} & NoteDeleteProps

export type NoteDetailsProps = NoteDeleteProps;

export type NoteCardProps = Omit<Note, "body"> & NoteDeleteProps

export type NoteLayoutProps = {
	notes: Note[];
}

