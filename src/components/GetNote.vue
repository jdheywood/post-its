<template>
  <div id="get-note" class="container row">
    <h3>New Note</h3>
    <input class="form-control"
           :value="newNote"
           @change="getNote"
           placeholder="Type your note here...">
    <button class="btn btn-primary pull-right" @click="addNote">Add Note</button>
  </div>
</template>
<script>
  export default{
    methods: {
      getNote (e) {
        this.$store.dispatch('getNote', e.target.value)
      },
      addNote () {
        if (this.$store.state.newNote.length > 0) {
          this.$store.dispatch('addNote')
          this.$store.dispatch('clearNote')
        }
      }
    },
    computed: {
      newNote () {
        return this.$store.getters.newNote
      }
    }
}
</script>
