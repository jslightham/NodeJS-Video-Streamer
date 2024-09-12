<script>
export default {
  props: {
    vInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    like(){
      this.axios.get(this.$apiIp + "/posts/like/" + this.$route.query.id).then((res) =>{
        this.vInfo = res.data;
      })
    },
  }
}
</script>

<template>
  <div class="card" style="background-color: #404e5b;">
    <h5 class="card-header" style="background-color: #1e2934">Video Information</h5>
    <div class="card-body">
      <h2 class="card-title video-title">{{vInfo.title}}</h2>
      <p class="card-text">{{vInfo.description}}</p>
      <h3 v-if="vInfo.transcoding">Transcoding Progress: {{vInfo.eta}}</h3>
      <div class="progress" v-if="vInfo.transcoding">
        <div class="progress-bar" role="progressbar" style="width: 25%" v-bind:style="'width: '+ vInfo.progress + '%'" v-bind:aria-valuenow="vInfo.progress" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <br>
      <form v-on:submit.prevent="like">
        <button href="#" class="btn btn-primary" style="width: 100%">Like - {{vInfo.likes}}</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.video-title{
  font-weight: bold;
}


</style>