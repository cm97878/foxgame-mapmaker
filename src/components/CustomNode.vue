<template>
    <div class="node-boundary" >
        {{ data.areaName }}
    </div>
</template>

<script setup lang="ts">
    import { useMapStore } from '@/stores/mapStore.js';
    
    const mapStore = useMapStore();

    const name = "customNode";
    
    //TODO: This wont work. Need to move all the tooltip stuff to the overmap panel, and do something with emitting events for mouse-overe'd nodes
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