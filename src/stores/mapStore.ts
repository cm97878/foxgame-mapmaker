import type { GraphNode } from '@vue-flow/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMapStore = defineStore('mapStuff', () => {
    
    const selectedNode =  ref({data: {}} as GraphNode);

    const mapNodes = ref([]);
    const mapEdges = ref([]);


    return {
        mapNodes, mapEdges, selectedNode,
    }
})