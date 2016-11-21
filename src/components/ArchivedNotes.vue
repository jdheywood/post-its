<template>
  <div id="archived-notes" class="container row">
    <h3 v-if="archived.length > 0">Archived ({{archived.length}})</h3>
    <ul class="list-group">
      <li class="list-group-item" v-for="note in archived">
        <p>{{note.body}}</p>
        <p class="user">(Created by {{note.userName}}, {{note.created | moment}})</p>
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
  import moment from 'moment'
  export default{
    methods: {
      remove (note) {
        this.$store.dispatch('removeNote', note)
      },
      moment: function () {
        return moment()
      }
    },
    computed: {
      archived () {
        return this.$store.getters.archivedNotes
      }
    },
    filters: {
      moment: function (date) {
        return moment(date).fromNow()
      }
    }
  }
</script>
