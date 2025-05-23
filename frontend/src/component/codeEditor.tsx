import { Editor } from "@monaco-editor/react";

function CodeEditor() {
    return (
        <div>
            <Editor
                height="500px"
                defaultLanguage="javascript, c++"
                defaultValue=""
                theme="vs-dark"
                className="rounded-2xl"
            />
        </div>
    )
}

export default CodeEditor
