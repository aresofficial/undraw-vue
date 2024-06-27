# Undraw illustrations for Vue 3

<img src="https://github.com/aresofficial/undraw-vue/assets/5167994/b9a0106c-a933-4271-b0d9-1edc4f599c98" alt="Logo" width="500px" />

## Usage

```ts
<script setup lang="ts">
import { UndrawIllustration } from 'undraw-vue';
</script>

<template>
  <UndrawIllustration
    name="Done"
    size="15rem"
    color="var(--primary-color)"
  />
</template>
```

## Properties

| Name    | Required | Default   | Description                                 |
|---------|----------|-----------|---------------------------------------------|
| `name`  | **yes**  | -         | Illustration name (see `Illustration` type) |
| `size ` | no       | `100%`    | Illustration size (height)                  |
| `color` | no       | `#6D07E8` | Illustration accent color                   |
| `style` | no       | -         | Illustration CSS styles                     |

## Supported illustrations

Please check https://github.com/aresofficial/undraw-vue/blob/main/src/types/Illustration.ts
