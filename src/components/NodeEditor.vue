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
        Custom Function: <input v-model="nodeDataUpdate.data.customFunc" /><br/>
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
    <button class="updateButton" @click="deleteNode(mapStore.selectedNode)">Delete</button><br />
    <button @click="saveFile()">save</button><br />
    <button @click="loadFile()">load</button>
    
</div>
</template>

<script setup lang="ts">
    import { useMapStore } from '@/stores/mapStore.js';
    import { Zone, type AreaData } from '@/types/areaData';
    import { useVueFlow, type GraphNode, type GraphEdge } from '@vue-flow/core';
    import { ref, toRefs, watch } from 'vue';
    import { saveAs } from 'file-saver';
    import testNodes from '@/assets/overworldData.json';

    const mapStore = useMapStore();
    const zoneOptions = [Zone.FOREST, Zone.DEEP_FOREST, Zone.RIVERBANK, Zone.SPECIAL]

    const { findNode, removeNodes, getConnectedEdges, removeEdges, nodes, setNodes, edges, setEdges } = useVueFlow({ id:"map"});

    //Realized after I worked it out this isnt needed, we can just add a clause to the customFunc handling that just processes an eval() on it. ugh.
    // import testNodes from '@/assets/test.json';
    // const jsonNodes = testNodes;
    // const mapNodes = ref<GraphNode[]>([]);
    
    // jsonNodes.forEach((item) => {
    //     let temp2 = {} as GraphNode;
    //     temp2.id = item.id;
    //     temp2.position = structuredClone(item.position);
    //     temp2.type = item.type;
    //     if(item.data.customFunc) {
    //         item.data.customFunc = eval("(" + item.data.customFunc +")");
    //     }
    //     temp2.data = Object.assign({}, item.data);
    //     mapNodes.value.push(temp2);
    // })


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
            handles: []
        },
    })

    //i hate this a lot and i hope you hate it too. i fucked around with filters and object nonsense but tldr if i just do selectednode.data = nodedataupdate.data it just sets the pointer to the same spot and fucks everything up.
    const updateNode = function() {
        if(selectedNode.value.id != nodeDataUpdate.value.id) {
            getConnectedEdges(selectedNode.value.id).forEach((edge) => {
                removeEdges(edge);
            })
            selectedNode.value.id = nodeDataUpdate.value.id;
        }
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

    const saveFile = function() {
        //TODO: Needs to export edges for the nodes, and a data attribute to custom-add the handles in the main project

        //clears the handles, otherwise it keeps making more if the map was imported
        nodes.value.forEach((node) => {
            node.data.handles = []
        })

        let edgeSave = [] as object[];
        edges.value.forEach((edge) => {
            let source = edge.source;
            let target = edge.target;
            let sourceHandle = edge.sourceHandle;
            let targetHandle = edge.targetHandle
            let sourceNode = findNode(source);
            let targetNode = findNode(target);
            sourceNode?.data.handles.push(sourceHandle);
            targetNode?.data.handles.push(targetHandle);
            edgeSave.push({
                id: source+"-"+target, 
                source,
                target,

                sourceHandle,
                targetHandle,
            });
        })



        let nodeSave = [] as GraphNode[]
        nodes.value.forEach((node) => {
            let temp = {
                id: node.id,
                type: 'custom',
                position: { x: node.position.x, y: node.position.y },
                data: {

                } as AreaData,
            } as GraphNode
            temp.data.areaSpecialID = node.data.areaSpecialID;
            temp.data.customFunc = node.data.customFunc;
            temp.data.areaName = node.data.areaName;
            temp.data.zone = node.data.zone;
            temp.data.description = node.data.description;
            temp.data.killCount = node.data.killCount;
            temp.data.scoutThreshold = node.data.scoutThreshold;
            temp.data.interactable = node.data.interactable;
            temp.data.handles = node.data.handles;

            nodeSave.push(temp)
        })

        let file = new File([JSON.stringify({nodeSave, edgeSave}, null, "\t")], "overworldData.json", {type: "application/json"});
        saveAs(file);
    }

    const loadFile = function() {
        setNodes(testNodes.nodeSave);
        setEdges(testNodes.edgeSave);
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