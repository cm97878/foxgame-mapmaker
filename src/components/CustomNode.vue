<template>
    <div class="node-boundary" >
        {{ data.areaName }}
    </div>
    <Handle :id="props.id+','+1" type="source" :position="Position.Top" :style="handleSize" />
    <Handle :id="props.id+','+2" type="source" :position="Position.Bottom" :style="handleSize" />
    <Handle :id="props.id+','+3" type="source" :position="Position.Left" :style="handleSize" />
    <Handle :id="props.id+','+4" type="source" :position="Position.Right" :style="handleSize" />
</template>

<script setup lang="ts">
    import { Handle, Position } from '@vue-flow/core'
    import { computed } from 'vue';

    const name = "customNode";
    
    const props = defineProps({
        id: String,
        data: {
            type: Object,
            required: true,
        },
    })

    const handleSize = computed(() => ({ height: ".8em", width: ".8em" }))
</script>

<style>
  .node-boundary {
    padding: 10px;
    border-radius: 20px;
    width: 100px;
    font-size: 24px;
    text-align: center;
    border-style: solid;
    
    color: #222; 
    cursor: pointer;
  }
</style>