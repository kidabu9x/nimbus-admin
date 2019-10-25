import React from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

function CustomEditor(props) {
    const placeholder = props.placeholder || "Nhập...";
    const [html, setHtml] = React.useState(
        EditorState.createEmpty()
    );

    const handleChange = (newHtml) => {
        setHtml(newHtml);
    }

    return (
        <Editor
            editorState={html}
            onChange={handleChange}
            placeholder={placeholder}
        />
    )
}

export default CustomEditor;