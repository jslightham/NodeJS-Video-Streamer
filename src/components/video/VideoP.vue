<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    vInfo: {
      type: Object,
      required: true
    },
    uri: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="video">
    <center>
      <div class="card" style="background-color: #404e5b; width: 75%;">
        <h5 class="card-header" style="background-color: #1e2934">Video</h5>
        <img v-if="vInfo.transcoding" v-bind:src="uri+'/thumbnails/'+ vInfo._id" class="unloaded-thumbnail">

        <video
            v-if="!vInfo.transcoding"
            id="my-video"
            class="video-js vjs-theme-forest"
            controls
            fluid="true"
            v-bind:poster="uri +'/thumbnails/' + id"
            data-setup="{}"
            preload="metadata">
          <source v-bind:src="uri +'/video2/' + id" type="video/mp4" />
          <p class="video-js vjs-theme-forest">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
          </p>
        </video>
      </div>
    </center>
  </div>
</template>

<style scoped>
.unloaded-thumbnail{
  max-height: 50vh;
  width: auto;
}

</style>