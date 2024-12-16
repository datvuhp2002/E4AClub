// components/CKEditorComponent.tsx
"use client";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@/ckeditor5/build/ckeditor";
import CustomUploadAdapter from "@/helpers/CustomUploadAdapter";

type CKEditorComponentProps = {
  value: string;
  onChange: (data: string) => void;
  register: any;
  setValue: any;
  errors: any;
};

const CKEditorComponent: React.FC<CKEditorComponentProps> = ({
  value,
  onChange,
  register,
  setValue,
  errors,
}) => {
  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return new CustomUploadAdapter(loader);
    };
  }

  return (
    <div className="mb-3">
      <label className="form-label">Nội dung:</label>
      {typeof window !== "undefined" && (
        <CKEditor
          editor={Editor}
          data={value}
          onReady={(editor) => {
            register("content", {
              required: "Vui lòng viết nội dung cho bài học của bạn",
            });
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setValue("content", data);
            onChange(data); // Call onChange to update the parent component
          }}
          config={{ extraPlugins: [uploadPlugin] }}
        />
      )}
      {errors.content && (
        <p className="text-danger">{String(errors.content?.message)}</p>
      )}
    </div>
  );
};

export default CKEditorComponent;
