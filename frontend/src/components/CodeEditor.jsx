import Editor from "@monaco-editor/react";

export default function CodeEditor({
  code,
  setCode,
}) {
  return (
    <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
      <Editor
        height="500px"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) =>
          setCode(value || "")
        }
      />
    </div>
  );
}