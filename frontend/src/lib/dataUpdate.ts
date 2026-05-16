import {
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

import type { RootState } from "../store/store";
import type { SaveOptions } from "./linkGenerator";

import { db } from "./dbConfig";

export async function updateEditorState(
  id: string,
  state: RootState,
  options: SaveOptions
) {

  try {

    const payload: Record<string, string | boolean | Timestamp> = {
      language: state.editor.language,
      code: state.editor.code,


      updatedAt: Timestamp.now(),

      // refresh TTL
      expiresAt: Timestamp.fromDate(
        new Date(Date.now() + 24 * 60 * 60 * 1000)
      ),
    };

    if (options.saveInput) {
      payload.input = state.editor.input;
    }

    if (options.saveOutput) {
      payload.output = state.editor.output;
      payload.outputType = state.editor.outputType;
    }

    const docRef = doc(
      db,
      "editorStates",
      id
    );

    await updateDoc(docRef, payload);

    return true;

  } catch (error) {

    console.error(
      "Error updating document:",
      error
    );

    return false;
  }
}