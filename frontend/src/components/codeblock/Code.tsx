import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { setCode } from "../../store/editorSlice";

import Editor from '@monaco-editor/react';

import "./code.css";

export default function CodeBlock() {
    const dispatch = useDispatch();
    const { code, language } = useSelector((state: RootState) => state.editor);

    return (
        <Editor
            className="code-editor"
            language={language}
            value={code}
            theme="vs-dark"
            options={{
                fontSize: 14,
                lineHeight: 18,
                minimap: {
                    enabled: true
                },
                automaticLayout: true,
            }}
            onChange={(newValue: string | undefined) => dispatch(setCode(newValue || ''))}
        />
    );
}