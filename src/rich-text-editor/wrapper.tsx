import { useState } from "react";
import RichTextEditor, { RichTextEditorProps } from "./core";

const store: Record<string, React.Dispatch<React.SetStateAction<RichTextEditorProps>>
> = {};

// 暴露 setState 方法, 以便vue组件调用
// eslint-disable-next-line react-refresh/only-export-components
export function updateRichTextEditorContext(v: RichTextEditorProps) {
    if (v.id) {
        store[v.id]?.(v);
    }
}

export function RichTextEditorWithContext(v: RichTextEditorProps) {
    const [state, setState] = useState(v);
    store[v.id] = setState;
    return <RichTextEditor {...state} />;
}
