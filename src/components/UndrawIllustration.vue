<script setup lang="ts">
import { defineAsyncComponent, defineProps, withDefaults } from 'vue';
import type { Illustration, UndrawIllustrationProps } from '../types';

const props = withDefaults(defineProps<UndrawIllustrationProps & { name: Illustration }>(), {
  color: '#6D07E8',
  size: '100%',
});

const slots = defineSlots<{ loading() : any }>()

const component = defineAsyncComponent(async () => {
  try {
    const { default: importedComponent } = await import(`../illustrations/${props.name}.vue`);
    return importedComponent;
  } catch (error) {
    console.error(`Failed to load component ${props.name}:`, error);
    return null;
  }
});
</script>

<template>
  <Suspense>
    <template #default>
      <component 
        v-if="component !== null"
        :is="component"
        :color="color"
        :size="size"
        :style="style" 
      />
    </template>
    <template #fallback>
      <slot name="loading" />
    </template>
  </Suspense>
</template>
