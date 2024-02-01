<template>
    <div id="vf-map">
        <VueFlow :nodes="mapStore.mapNodes" class="general_outline">
            <template #node-custom ="{ data, id }">
                <CustomNode :data="data" :id="id"></CustomNode>
            </template>
        </VueFlow>
    </div>
    <NodeTooltip/>

</template>

<script setup lang="ts">
import CustomNode from './CustomNode.vue';

import { useMapStore } from '@/stores/mapStore.js';
import { VueFlow, useVueFlow, type GraphNode } from '@vue-flow/core';
import { useMagicKeys, useMouse } from '@vueuse/core';
import type { AreaData } from '@/types/areaData'

const mapStore = useMapStore();

const { shift:shiftHeld } = useMagicKeys()


const { nodesDraggable, onPaneReady, elementsSelectable, onNodeClick,  findNode,
     addEdges, nodes, edgesUpdatable, nodesConnectable, setMinZoom, onConnect, addNodes, onPaneClick, project, vueFlowRef, selectionKeyCode } = useVueFlow({ id:"map"});

onPaneReady((instance) => {
    addEdges(mapStore.mapEdges);
    nodesDraggable.value = true;
    elementsSelectable.value = true;
    edgesUpdatable.value = true;
    nodesConnectable.value = true;
    selectionKeyCode.value = null;

    setMinZoom(.25);

    instance.setCenter(0, 0, {zoom: 0.5})  
})

onConnect((params) => addEdges(params))

onNodeClick((node) => {
    const chosenNode = findNode(node.node.id)!;
})

onPaneClick((event) => {
    if(shiftHeld.value) {
        let nodeLength = nodes.value.length;
        
        if(vueFlowRef.value) {
            const { left, top } = vueFlowRef.value.getBoundingClientRect()
            const position = project({
                x: event.clientX - left-35,
                y: event.clientY - top-10,
            })
            
            let temp = {
                id: ""+nodeLength+1,
                type: 'custom',
                position,
                data: {
                    areaName: "Node",
                    zone: "",
                    description: "",
                    killCount: 0,
                    scoutThreshold: 0
                } as AreaData
            }
            addNodes([temp]);
        }
    }
})
</script>
<style>
    #vf-map {
        height: 100%;
        width: 100%;
        background-color: aliceblue;
    }
</style>