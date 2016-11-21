<template>
  <div id="app" class="container">
    <GetNote></GetNote>
    <CurrentNotes></CurrentNotes>
    <ArchivedNotes></ArchivedNotes>
    <ConnectedUsers></ConnectedUsers>
  </div>
</template>

<script>
  import GetNote from './components/GetNote.vue'
  import CurrentNotes from './components/CurrentNotes.vue'
  import ArchivedNotes from './components/ArchivedNotes.vue'
  import ConnectedUsers from './components/ConnectedUsers.vue'
  export default {
    components: {
      GetNote,
      CurrentNotes,
      ArchivedNotes,
      ConnectedUsers
    }
  }
</script>

<style>
body {
 font-family: Helvetica, sans-serif;
}
</style>
