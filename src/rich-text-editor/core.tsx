import { Block, BlockNoteSchema, combineByGroup, filterSuggestionItems } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { getDefaultReactSlashMenuItems, SuggestionMenuController, useCreateBlockNote } from "@blocknote/react";
import { useMemo } from "react";
import * as locales from "@blocknote/core/locales";
import {
  getMultiColumnSlashMenuItems,
  multiColumnDropCursor,
  locales as multiColumnLocales,
  withMultiColumn,
} from "@blocknote/xl-multi-column";
import { useControllableValue } from "ahooks";


export type RichTextEditorProps = {
  id: string;
  initialBlocks?: Block[];
  onBlocksChange?: (blocks: Block[]) => void;
  readOnly?: boolean;
  theme?: 'light' | 'dark';
  locale: 'zh' | 'en';
};


export default function RichTextEditor(props: RichTextEditorProps) {
  // Stores the document JSON.
  const [, setBlocks] = useControllableValue<Block[]>(props, {
    defaultValue: props.initialBlocks,
    trigger: 'onBlocksChange'
  });

  const locale = props.locale || 'zh';
  const dictionary = {
    ...locales[locale],
    multi_column: multiColumnLocales[locale]
  };
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    dropCursor: multiColumnDropCursor,
    dictionary,
    initialContent: props.initialBlocks,
    schema: withMultiColumn(BlockNoteSchema.create()),
  });

  // Gets the default slash menu items merged with the multi-column ones.
  const getSlashMenuItems = useMemo(() => {
    return async (query: string) =>
      filterSuggestionItems(
        combineByGroup(
          getDefaultReactSlashMenuItems(editor),
          getMultiColumnSlashMenuItems(editor)
        ),
        query
      );
  }, [editor]);
  // Renders the editor instance and its document JSON.

  return <BlockNoteView
    theme={props.theme}
    editable={!props.readOnly} // 根据 readOnly 状态设置编辑器是否可编辑
    lang="zh"
    editor={editor}
    onChange={() => {
      // Saves the document JSON to state.
      setBlocks(editor.document as Block[]);
    }}
  >
    <SuggestionMenuController
      triggerCharacter={"/"}
      getItems={getSlashMenuItems}
    />
  </BlockNoteView>;
}


