<template>
  <div id="archived-notes" class="container row">
    <h3 v-if="archived.length > 0">Archived ({{archived.length}})</h3>
    <ul class="list-group">
      <li class="list-group-item" v-for="note in archived">
        {{note.body}}
        <div class="btn-group">
          <button type="button" @click="remove(note)" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-remove-circle"></span> Remove
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    methods: {
      remove (note) {
        this.$store.dispatch('removeNote', note)
      }
    },
    computed: {
      archived () {
        return this.$store.getters.archivedNotes
      }
    }
  }
</script>
