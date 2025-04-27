<script setup lang="ts">
import type { Block } from 'rich-text-editor';
import { Button, Message, Space } from '@arco-design/web-vue';
import RichTextEditor from 'rich-text-editor';
import { shallowRef } from 'vue';
import { initialContent } from './initialContent';
import { useLocationQuery } from './useLocationQuery';
import 'rich-text-editor/style.css';

const blocks = shallowRef<Block[]>(initialContent as Block[]);
const theme = useLocationQuery<'light' | 'drak'>('theme', 'light');
const readOnly = useLocationQuery<'false' | 'true'>('readOnly', 'false');
const locale = useLocationQuery<'zh' | 'en'>('locale', 'zh');

const times = shallowRef(0);
function onClick() {
  // 从剪贴板获取数据并尝试解析为 JSON
  navigator.clipboard.readText().then((text) => {
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        blocks.value = parsed;
        times.value++;
      }
      else {
        throw new TypeError('Parsed content is not an array');
      }
    }
    catch (error) {
      console.error('Failed to parse clipboard content as JSON', error);
      Message.error(`Failed to parse clipboard content as JSON${error.message}`);
    }
  });
}
</script>

<template>
  <div class="wrapper">
    <div class="header">
      <Space>
        <span>
          BlockNote Editor
        </span>
        <Button
          type="primary" @click="() => {
            theme = (theme == 'dark' ? 'light' : 'dark');
          }"
        >
          主题:{{ theme }}
        </Button>
        <Button type="text" @click="readOnly = (readOnly === 'true' ? 'false' : 'true')">
          <template v-if="readOnly === 'true'">
            只读
          </template>
          <template v-else>
            可编辑
          </template>
        </Button>
        <Button
          @click="() => {
            locale = (locale === 'zh' ? 'en' : 'zh');
          }"
        >
          locale:{{ locale }}
        </Button>
        <Button @click="onClick">
          导入
        </Button>
      </Space>
    </div>
    <div class="content">
      <div class="left">
        <RichTextEditor
          :key="times" :theme="theme" :locale="locale" :read-only="readOnly === 'true'"
          :initial-blocks="blocks" @blocks-change="(v) => {
            blocks = v;
          }"
        />
      </div>
      <div class="right">
        <div class="inner bordered">
          <pre><code>{{ JSON.stringify(blocks, null, 2) }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
</style>

<style scoped lang="less">
.wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  .header {
    height: 48px;
    line-height: 48px;
    padding-inline: 12px;
    display: flex;
    flex-direction: row;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 1em;
    position: relative;
    min-height: 0;
  }
}

.left,
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 12px;
  height: 100%;
  position: relative;
  overflow: auto;
}

.bn-block-column {
  border: 1px solid #eee;
}

.inner {
  border-radius: 0.5rem;
  flex: 1;
  overflow: hidden;

}

.inner.bordered {
  /* border: 1px solid gray; */
}

.inner pre {
  border-radius: 0.5rem;
  height: 100%;
  overflow: auto;
  padding-block: 1rem;
  padding-inline: 54px;
  width: 100%;
  white-space: pre-wrap;
}
</style>
