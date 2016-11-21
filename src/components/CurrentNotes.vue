<template>
  <div id="current-notes" class="container row">
    <h3 v-if="notes.length > 0">Current ({{notes.length}})</h3>
    <ul class="list-group">
      <li class="list-group-item" v-for="note in notes">
        <p>{{note.body}}</p>
        <p class="user">(Created by {{note.userName}}, {{note.created | moment}})</p>
        <div class="btn-group">
          <button type="button" @click="edit(note)" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-edit"></span> Edit
          </button>
          <button type="button" @click="archive(note)" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-ok-circle"></span> Archive
          </button>
          <button type="button" @click="remove(note)" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-remove-circle"></span> Remove
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import moment from 'moment'
  export default{
    methods: {
      edit (note) {
        this.$store.dispatch('editNote', note)
      },
      archive (note) {
        this.$store.dispatch('archiveNote', note)
      },
      remove (note) {
        this.$store.dispatch('removeNote', note)
      },
      moment: function () {
        return moment()
      }
    },
    computed: {
      notes () {
        return this.$store.getters.notes
      }
    },
    filters: {
      moment: function (date) {
        return moment(date).fromNow()
      }
    }
  }
</script>
<style>
  .btn-group{
    float: right;
  }
</style>
