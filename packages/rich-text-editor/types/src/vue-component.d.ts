import { Block } from "@blocknote/core";
import { type PropType } from "vue";
declare const RichTextEditorVueComponent: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    initialBlocks: {
        type: PropType<Block[]>;
    };
    onBlocksChange: {
        type: PropType<(blocks: Block[]) => void>;
    };
    readOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    theme: {
        type: PropType<"light" | "dark">;
        default: string;
    };
    locale: {
        type: PropType<"zh" | "en">;
        default: string;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    initialBlocks: {
        type: PropType<Block[]>;
    };
    onBlocksChange: {
        type: PropType<(blocks: Block[]) => void>;
    };
    readOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    theme: {
        type: PropType<"light" | "dark">;
        default: string;
    };
    locale: {
        type: PropType<"zh" | "en">;
        default: string;
    };
}>> & Readonly<{}>, {
    theme: "light" | "dark";
    readOnly: boolean;
    locale: "zh" | "en";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RichTextEditorVueComponent;
