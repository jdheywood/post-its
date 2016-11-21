<template>
  <div id="connected-users" class="container row">
    <h3 v-if="users.length > 0">Connected ({{users.length}})</h3>
    <ul class="list-group">
      <li class="list-group-item" v-for="user in users">
        <p>{{user.userName}}</p>
        <span class="connected">(Connected {{user.connected | moment}})</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import moment from 'moment'
  export default{
    computed: {
      users () {
        return this.$store.getters.users
      },
      myUser: function () {
        return this.$store.getters.myUserId
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
