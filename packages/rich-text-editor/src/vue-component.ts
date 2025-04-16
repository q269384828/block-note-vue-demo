import type { Block } from '@blocknote/core';
import type { PropType } from 'vue';
import { createElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { defineComponent, h, onMounted, shallowRef, watch } from 'vue';
import { RichTextEditorWithContext, updateRichTextEditorContext } from './wrapper';

const RichTextEditorVueComponent = defineComponent({
    name: 'RichTextEditor',
    props: {
        initialBlocks: {
            type: Array as PropType<Block[]>,
        },
        onBlocksChange: {
            type: Function as PropType<(blocks: Block[]) => void>,
        },
        readOnly: {
            type: Boolean,
            default: false,
        },
        theme: {
            type: String as PropType<'light' | 'dark'>,
            default: 'light',
        },
        locale: {
            type: String as PropType<'zh' | 'en'>,
            default: 'zh',
        },
    },
    setup(props) {
        const wrapperRef = shallowRef<HTMLDivElement>();
        const innerProps = shallowRef({
            id: `rich-text-editor-${Date.now()}-${Math.random()}`,
            initialBlocks: props.initialBlocks,
            readOnly: props.readOnly,
            theme: props.theme,
            locale: props.locale,
            onBlocksChange: (blocks: Block[]) => {
                props.onBlocksChange?.(blocks);
            },
        });
        watch(() => props.theme, () => {
            innerProps.value = {
                ...innerProps.value,
                theme: props.theme,
            };
            updateRichTextEditorContext(innerProps.value);
        });
        watch(() => props.locale, () => {
            innerProps.value = {
                ...innerProps.value,
                locale: props.locale,
            };
            updateRichTextEditorContext(innerProps.value);
        });
        watch(() => props.readOnly, () => {
            innerProps.value = {
                ...innerProps.value,
                readOnly: props.readOnly,
            };
            updateRichTextEditorContext(innerProps.value);
        });
        onMounted(() => {
            const node = wrapperRef.value || document.querySelector(`[data-id="${innerProps.value.id}"]`);
            if (node) {
                createRoot(node).render(
                    createElement(StrictMode, null, createElement(RichTextEditorWithContext, innerProps.value)),
                );
            }
        });

        return () => {
            return h('div', { 'ref': wrapperRef, 'data-id': innerProps.value.id });
        };
    },
});

export default RichTextEditorVueComponent;
