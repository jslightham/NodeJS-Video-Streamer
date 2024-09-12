<script>
export default {
  props: {
    posts: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="card" style="background-color: #404e5b;">
    <h5 class="card-header" style="background-color: #1e2934">Recent Videos</h5>
    <div class="card-body">
      <center><span v-for="post in posts" :key="post._id" style="margin-right: 15px;"><a v-bind:href="'/video?id='+ post._id"><img v-bind:src="uri + '/thumbnails/'+post._id" width="150px" style="margin-top: 15px;"></a></span></center>
    </div>
  </div>
</template>

<style scoped>

</style>