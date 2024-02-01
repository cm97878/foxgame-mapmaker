<template>
<div class="formPanel">
    ID: {{ selectedNode.id }}<br/>
    Type: {{ selectedNode.type }}<br/>
    Position: ({{ selectedNode.position?.x }}, {{ selectedNode.position?.y }})<br/>
    <hr class="solid">
    ==Current Data==<br/>
    Area Special ID: {{ selectedNode.data.areaSpecialID }}<br/>
    <!--TODO: The text here is absolutely fucked for some reason but thats an issue for later -->
    Custom Function: <pre>{{ selectedNode.data.customFunc }}</pre><br/>
    Name: {{ selectedNode.data.name }}<br/>
    Zone: {{ selectedNode.data.zone }}<br/>
    Description: {{ selectedNode.data.description }}<br/>
    Killcount: {{ selectedNode.data.killCount }}<br/>
    Scout Threshold: {{ selectedNode.data.scoutThreshold }}<br/>
    interactable: {{ selectedNode.data.interactable }}<br/>
    <hr class="solid">
    ==New data==<br/>
    Area Special ID: <input v-model="nodeDataUpdate.data.areaSpecialID"/><br/>
    <!--TODO: textareas appear ABOVE line intsead of hanging below it, idk how to fix that but it doesnt matter rn -->
    Custom Function: <textarea v-model="nodeDataUpdate.data.customFunc" ></textarea><br/>
    Name: <input v-model="nodeDataUpdate.data.areaName"/><br/>
    Zone: <input v-model="nodeDataUpdate.data.zone" /><br/>
    Description: <textarea v-model="nodeDataUpdate.data.description" ></textarea><br/>
    Killcount: <input v-model="nodeDataUpdate.data.killCount"/><br/>
    Scout Threshold: <input v-model="nodeDataUpdate.data.scoutThreshold"/><br/>
    interactable: <input type="checkbox" id="checkbox" v-model="nodeDataUpdate.data.interactable" />
    <label for="checkbox">{{ nodeDataUpdate.data.interactable }}</label><br/><br/>
    <button class="updateButton" @click="updateNode()">Update</button>
</div>
</template>

<script setup lang="ts">
    import { useMapStore } from '@/stores/mapStore.js';
    import { useVueFlow, type GraphNode } from '@vue-flow/core';
    import { ref, toRefs, watch } from 'vue';

    const mapStore = useMapStore();

    const { nodesDraggable, onPaneReady, elementsSelectable, onNodeClick,  findNode, addEdges, nodes, edgesUpdatable, nodesConnectable, setMinZoom, onConnect, addNodes, onPaneClick, project, vueFlowRef, selectionKeyCode, onEdgeClick } = useVueFlow({ id:"map"});

    const { selectedNode } = toRefs(mapStore);
    const nodeDataUpdate = ref({
        data: {
            areaSpecialID: "",
            customFunc: "",
            areaName: "",
            zone: "",
            description: "",
            killCount: 0,
            scoutThreshold: 0,
            interactable: false,
        }
    })

    //i hate this a lot and i hope you hate it too. i fucked around with filters and object nonsense but tldr if i just do selectednode.data = nodedataupdate.data it just sets the pointer to the same spot and fucks everything up.
    const updateNode = function() {
        selectedNode.value.data.areaSpecialID = nodeDataUpdate.value.data.areaSpecialID;
        selectedNode.value.data.customFunc = nodeDataUpdate.value.data.customFunc;
        selectedNode.value.data.areaName = nodeDataUpdate.value.data.areaName;
        selectedNode.value.data.zone = nodeDataUpdate.value.data.zone;
        selectedNode.value.data.description = nodeDataUpdate.value.data.description;
        selectedNode.value.data.killCount = nodeDataUpdate.value.data.killCount;
        selectedNode.value.data.scoutThreshold = nodeDataUpdate.value.data.scoutThreshold;
        selectedNode.value.data.interactable = nodeDataUpdate.value.data.interactable;
    }

    //LOL REVERSE IT WOO, this sucked to type but im too tired to see what i should be doing
    watch(selectedNode, (newNode) => {
        nodeDataUpdate.value.data.areaSpecialID = newNode.data.areaSpecialID;
        nodeDataUpdate.value.data.customFunc = newNode.data.customFunc;
        nodeDataUpdate.value.data.areaName = newNode.data.areaName;
        nodeDataUpdate.value.data.zone = newNode.data.zone;
        nodeDataUpdate.value.data.description = newNode.data.description;
        nodeDataUpdate.value.data.killCount = newNode.data.killCount;
        nodeDataUpdate.value.data.scoutThreshold = newNode.data.scoutThreshold;
        nodeDataUpdate.value.data.interactable = newNode.data.interactable;
    })
</script>

<style>
hr.solid {
    border-top: 2px solid rgb(177, 177, 177);
    width: 96%;
}
.formPanel {
    background-color: aliceblue;
}
</style>