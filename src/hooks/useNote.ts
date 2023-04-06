import { useOutletContext } from "react-router-dom";

import { Note } from "components/Note/Note.types";

export function useNote() {
  return useOutletContext<Note>();
}
