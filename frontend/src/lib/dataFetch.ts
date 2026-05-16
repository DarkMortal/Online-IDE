import {
  doc,
  getDoc,
  Timestamp
} from "firebase/firestore";

import { db } from "./dbConfig";

type EditorStateDocument = {
  code: string;
  language: string;
  input?: string;
  output?: string;
  outputType?: string;
  expiresAt: Timestamp;
};

export async function fetchEditorState(
  id: string
): Promise<EditorStateDocument | null> {

  try {

    const docRef = doc(
      db,
      "editorStates",
      id
    );

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as EditorStateDocument;

  } catch (error) {

    console.error(
      "Error fetching document:",
      error
    );

    return null;
  }
}