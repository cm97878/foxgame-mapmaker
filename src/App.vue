<template>
    <div class="window-border">
        <div class="app_container general_outline">
            <OvermapPanel />
        </div>
        <div class="app_container general_outline">
            <NodeEditor />
        </div>
    </div>
</template>


<script setup lang="ts">
import NodeEditor from './components/NodeEditor.vue';
import OvermapPanel from './components/OvermapPanel.vue';


</script>


<style>
    .window-border {
        width: 95vw;
        height: 95vh;
        align-items: stretch;
        margin: 6px;
        display: flex;
        background-image: linear-gradient(rgb(53, 53, 53), rgb(25, 25, 25));
        border: 4px ridge rgb(179, 11, 11);
        font-family: 'NameHere'; 
        font-size: 20px;
    }

    @media (max-width: 1300px) {
        .window-border {
            width: 100%;
            height: calc(100vh - 8px);
            margin: 0;
        }   
    }

    .app_container {
        display: flex;
        flex-direction: column;
        padding: 10px;
        min-width: 480px;
        min-height: 480px;
        width: 50%;
    }

</style>
