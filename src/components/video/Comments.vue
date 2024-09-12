<script>
export default {
  props: {
    vInfo: {
      type: Object,
      required: true
    },
  },
  methods: {
    submitComment(){
      let msg = {};
      msg.comment = this.comment;
      this.axios.post(this.$apiIp + "/posts/postComment/" + this.$route.query.id, msg).then((res) =>{
        this.vInfo = res.data;
      })
    }
  }
}
</script>

<template>
  <div class="card" style="background-color: #404e5b;">
    <h5 class="card-header" style="background-color: #1e2934">Comments</h5>
    <div class="card-body">
      <div class="media pt-3" v-for="com in vInfo.comments" :key="com">
        <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          {{com}}
        </p>
      </div>
      <br>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">
          <h5>Create New</h5>
        </label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style="color: white; background-color: #505f6d; border: none;" v-model="comment"></textarea>
        <br>
        <button  class="upload-button btn btn-primary" @click="submitComment">Post</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.media{
  border-bottom: 1px dotted #ccc;
}
</style>