<template>
    <div class="node-boundary" >
        {{ data.areaName }}
    </div>
    <Handle :id="props.id+','+1" type="source" :position="Position.Top" />
    <Handle :id="props.id+','+2" type="source" :position="Position.Bottom" />
    <Handle :id="props.id+','+3" type="source" :position="Position.Left" />
    <Handle :id="props.id+','+4" type="source" :position="Position.Right" />
</template>

<script setup lang="ts">
    import { Handle, Position } from '@vue-flow/core'

    const name = "customNode";
    
    const props = defineProps({
        id: String,
        data: {
            type: Object,
            required: true,
        },
        handles: Object
    })
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