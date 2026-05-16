import {
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";

import { db } from "./dbConfig";
import type { RootState } from '../store/store';

export type SaveOptions = {
  saveInput: boolean;
  saveOutput: boolean;
};

export async function saveEditorState(
  state: RootState,
  options: SaveOptions
) {
  const data: Record<string, string | boolean | Timestamp> = {
    language: state.editor.language,
    code: state.editor.code,
  };

  if (options.saveInput) {
    data.input = state.editor.input;
  }

  if (options.saveOutput) {
    data.output = state.editor.output;
    data.outputType = state.editor.outputType;
  }

  // expires after 24 hours
  data.expiresAt = Timestamp.fromDate(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  );

  const docRef = await addDoc(
    collection(db, "editorStates"),
    data
  );

  return docRef.id;
}