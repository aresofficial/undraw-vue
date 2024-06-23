# Undraw illustrations for Vue 3

## Usage

```ts
<script setup lang="ts">
import { UndrawIllustration } from 'undraw-vue';
</script>

<template>
  <UndrawIllustration
    name="Done"
    width="15rem"
    color="var(--primary-color)"
  />
</template>
```

## Properties

| Name    | Required | Default   | Description                                 |
|---------|----------|-----------|---------------------------------------------|
| `name`  | **yes**  | -         | Illustration name (see `Illustration` type) |
| `width` | no       | `100%`    | Illustration width                          |
| `color` | no       | `#6D07E8` | Illustration accent color                   |
| `style` | no       | -         | Illustration CSS styles                     |

## Supported illustrations

Please check https://github.com/aresofficial/undraw-vue/blob/main/src/types/Illustration.ts