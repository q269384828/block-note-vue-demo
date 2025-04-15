<template>
  <button @click="() => {
    theme = (theme == 'dark' ? 'light' : 'dark');
  }">theme:{{ theme }}</button>
  <button @click="readOnly = !readOnly">
    当前模式 readOnly : {{ readOnly }}
  </button>
  <div class="wrapper">
    <div class="left">
      <div>BlockNote Editor:
      </div>
      <div class="item">
        <RichTextEditor :theme='theme' :readOnly="readOnly" :initialBlocks="blocks" @blocksChange="(v) => {
          blocks = v;
        }">
        </RichTextEditor>
      </div>
    </div>
    <div class="right">
      <div>Document JSON:</div>
      <div class="item bordered">
        <pre>
            <code>{{
              JSON.stringify(blocks, null, 2) }}</code>
          </pre>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import RichTextEditor from './rich-text-editor/vue-component';
import { Block } from '@blocknote/core';
const blocks = shallowRef<Block[]>([
  {
    "id": "7cb877a4-b916-4aea-8c9a-7894ef12f40c",
    "type": "paragraph",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "烦烦烦烦烦烦烦烦烦方法",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "71affba1-df47-4cb6-bd7d-4ea638b3013a",
    "type": "paragraph",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  }
]);
const theme = shallowRef<'light' | 'dark'>('light');
const readOnly = shallowRef(false);
</script>

<style>
@import './styles.css'
</style>