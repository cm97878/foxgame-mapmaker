<template>
<div class="formPanel">
    <div class="row-box coords">
        <span>ID: {{ selectedNode.id }}</span>
        <span>Type: {{ selectedNode.type }}<br/></span>
        <span>Position: ({{ selectedNode.position?.x }}, {{ selectedNode.position?.y }})</span>
    </div>
    <div class="divider"></div>
    <span class="title">==Current Data==</span>
    <div class="currentData">
        Area Special ID: {{ selectedNode.data.areaSpecialID }}<br/>
        <!--TODO: The text here is absolutely fucked for some reason but thats an issue for later -->
        Custom Function: <pre>{{ selectedNode.data.customFunc }}</pre><br/>
        Name: {{ selectedNode.data.areaName }}<br/>
        Zone: {{ selectedNode.data.zone }}<br/>
        Description: {{ selectedNode.data.description }}<br/>
        <div class="row-box">
            <span>Killcount: {{ selectedNode.data.killCount }}</span>
            <span>Scout Threshold: {{ selectedNode.data.scoutThreshold }}</span>
            <span>interactable: {{ selectedNode.data.interactable }}</span>
        </div>    
    </div>
    <div class="divider"></div>
    <span class="title">==New Data==</span>
    <div class="newData">
        ID: <input v-model="nodeDataUpdate.id"><br />
        Area Special ID: <input v-model="nodeDataUpdate.data.areaSpecialID"/><br/>
        <!--TODO: textareas appear ABOVE line intsead of hanging below it, idk how to fix that but it doesnt matter rn -->
        Custom Function: <textarea v-model="nodeDataUpdate.data.customFunc" ></textarea><br/>
        Name: <input v-model="nodeDataUpdate.data.areaName" placeholder="Node name"/><br/>
        Zone: <select v-model="nodeDataUpdate.data.zone"> 
            <option v-for="(item) in zoneOptions" :value="item" >{{ item }}</option>
        </select><br/>
        Description: <textarea v-model="nodeDataUpdate.data.description" placeholder="insert node description here"></textarea><br/>
        Killcount: <input v-model="nodeDataUpdate.data.killCount"/><br/>
        Scout Threshold: <input v-model="nodeDataUpdate.data.scoutThreshold"/><br/>
        interactable: <input type="checkbox" id="checkbox" v-model="nodeDataUpdate.data.interactable" />
        <label for="checkbox">{{ nodeDataUpdate.data.interactable }}</label><br/><br/>
    </div>
    <button class="updateButton" @click="updateNode()">Update</button><br />
    <button class="updateButton" @click="deleteNode(mapStore.selectedNode)">Delete</button>
    
</div>
</template>

<script setup lang="ts">
    import { useMapStore } from '@/stores/mapStore.js';
    import { Zone } from '@/types/areaData';
    import { useVueFlow, type GraphNode } from '@vue-flow/core';
    import { ref, toRefs, watch } from 'vue';

    const mapStore = useMapStore();
    const zoneOptions = [Zone.FOREST, Zone.DEEP_FOREST, Zone.SPECIAL]

    const { nodesDraggable, onPaneReady, elementsSelectable, onNodeClick,  findNode, addEdges, nodes, edgesUpdatable, nodesConnectable, setMinZoom, onConnect, addNodes, onPaneClick, project, vueFlowRef, selectionKeyCode, onEdgeClick, removeNodes } = useVueFlow({ id:"map"});

    const { selectedNode } = toRefs(mapStore);
    const nodeDataUpdate = ref({
        id: "",
        data: {
            areaSpecialID: "",
            customFunc: "",
            areaName: "",
            zone: Zone.FOREST,
            description: "",
            killCount: 0,
            scoutThreshold: 0,
            interactable: false,
        }
    })

    //i hate this a lot and i hope you hate it too. i fucked around with filters and object nonsense but tldr if i just do selectednode.data = nodedataupdate.data it just sets the pointer to the same spot and fucks everything up.
    const updateNode = function() {
        selectedNode.value.id = nodeDataUpdate.value.id;
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
        nodeDataUpdate.value.id = newNode.id;
        nodeDataUpdate.value.data.areaSpecialID = newNode.data.areaSpecialID;
        nodeDataUpdate.value.data.customFunc = newNode.data.customFunc;
        nodeDataUpdate.value.data.areaName = newNode.data.areaName;
        nodeDataUpdate.value.data.zone = newNode.data.zone;
        nodeDataUpdate.value.data.description = newNode.data.description;
        nodeDataUpdate.value.data.killCount = newNode.data.killCount;
        nodeDataUpdate.value.data.scoutThreshold = newNode.data.scoutThreshold;
        nodeDataUpdate.value.data.interactable = newNode.data.interactable;
    })

    const deleteNode = function(node:GraphNode) {
        removeNodes(node, true);
    }
</script>

<style>
hr.solid {
    border-top: 2px solid rgb(177, 177, 177);
    width: 96%;
}
.formPanel {
    background-color: aliceblue;
}
.coords {
    background-color: rgb(61, 190, 255);
}
.row-box {
    display:flex;
    justify-content:space-between;
    span {
        margin-right: 8px;
    }
}
.currentData {
    background-color:rgb(172, 255, 124);
}
.newData {
    background-color:rgb(253, 160, 160);
}
.row {
    display:flex;
}
.divider {
    border-bottom: 6px solid;
}
.title { 
    display: flex; 
    justify-content: center 
}
</style>