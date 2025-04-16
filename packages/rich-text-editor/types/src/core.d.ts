import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import './style.css';
export type RichTextEditorProps = {
    id: string;
    initialBlocks?: Block[];
    onBlocksChange?: (blocks: Block[]) => void;
    readOnly?: boolean;
    theme?: 'light' | 'dark';
    locale: 'zh' | 'en';
};
export default function RichTextEditor(props: RichTextEditorProps): import("react/jsx-runtime").JSX.Element;
