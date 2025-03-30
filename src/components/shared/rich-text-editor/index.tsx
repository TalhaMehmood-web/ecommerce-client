"use client";

import React, { useEffect, useState } from "react";
import { SerializedEditorState } from "lexical";
import { Editor } from "@/components/blocks/editor-00/editor";
import { useFormContext } from "react-hook-form";

export const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

interface RichTextEditorProps {
  editorKey?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  editorKey = "description",
}) => {
  const { setValue, getValues } = useFormContext();

  const [editorState, setEditorState] = useState<SerializedEditorState>(
    getValues(editorKey) ?? initialValue // Ensure default value is always set
  );

  useEffect(() => {
    setValue(editorKey, editorState);
  }, [editorState, editorKey]); // Ensure effect updates when `editorKey` changes

  return (
    <Editor
      editorSerializedState={editorState ?? initialValue} // Prevent undefined values
      onSerializedChange={(value) => setEditorState(value)}
    />
  );
};

export default RichTextEditor;
