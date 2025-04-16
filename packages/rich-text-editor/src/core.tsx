import type { Block } from '@blocknote/core';
import { codeBlock } from '@blocknote/code-block';
import { BlockNoteSchema, combineByGroup, filterSuggestionItems } from '@blocknote/core';
import * as locales from '@blocknote/core/locales';
import { BlockNoteView } from '@blocknote/mantine';
import { getDefaultReactSlashMenuItems, SuggestionMenuController, useCreateBlockNote } from '@blocknote/react';
import {
  getMultiColumnSlashMenuItems,
  multiColumnDropCursor,
  locales as multiColumnLocales,
  withMultiColumn,
} from '@blocknote/xl-multi-column';
import { useControllableValue, useUnmount } from 'ahooks';
import { useMemo } from 'react';

export interface RichTextEditorProps {
  id: string;
  initialBlocks?: Block[];
  onBlocksChange?: (blocks: Block[]) => void;
  readOnly?: boolean;
  theme?: 'light' | 'dark';
  locale: 'zh' | 'en';
}

export default function RichTextEditor(props: RichTextEditorProps) {
  // Stores the document JSON.
  const [, setBlocks] = useControllableValue<Block[]>(props, {
    defaultValue: props.initialBlocks,
    trigger: 'onBlocksChange',
  });

  const locale = props.locale || 'zh';
  const dictionary = {
    ...locales[locale],
    multi_column: multiColumnLocales[locale],
  };

  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    dropCursor: multiColumnDropCursor,
    dictionary,
    initialContent: props.initialBlocks,
    schema: withMultiColumn(BlockNoteSchema.create()),
    tables: {
      cellBackgroundColor: true,
    },
    uploadFile: async (file: File) => {
      return URL.createObjectURL(file);
    },
    codeBlock,
  });

  useUnmount(() => {
    setBlocks(editor.document as Block[]);
  });

  const getSlashMenuItems = useMemo(() => {
    return async (query: string) =>
      filterSuggestionItems(
        combineByGroup(
          getDefaultReactSlashMenuItems(editor),
          getMultiColumnSlashMenuItems(editor),
        ),
        query,
      );
  }, [editor]);

  return (
    <BlockNoteView
      theme={props.theme}
      editable={!props.readOnly}
      lang="zh"
      editor={editor}
      onChange={() => {
        // Saves the document JSON to state.
        setBlocks(editor.document as Block[]);
      }}
    >
      <SuggestionMenuController
        triggerCharacter="/"
        getItems={getSlashMenuItems}
      />
    </BlockNoteView>
  );
}
