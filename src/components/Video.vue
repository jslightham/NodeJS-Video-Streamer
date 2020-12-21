<template>
    <div class="wholePage">
        
        <div class="row">
    <div class="col-sm-5 center-middle">
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
        <br>
        <div class="card" style="background-color: #404e5b;">
          <h5 class="card-header" style="background-color: #1e2934">Recent Videos</h5>
            <div class="card-body">
                <center><span v-for="post in posts" :key="post._id" style="margin-right: 15px;"><a v-bind:href="'/video?id='+ post._id"><img v-bind:src="uri + '/thumbnails/'+post._id" width="150px" style="margin-top: 15px;"></a></span></center>
            </div>
        </div>
    </div>
    <div class="col-sm-7 center-middle">
      <br>
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
    </div>
  </div>
<br>
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
        <label for="exampleFormControlTextarea1"><h5>Create New</h5></label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style="color: white; background-color: #505f6d; border: none;" v-model="comment"></textarea>
        <br>
        <button  class="upload-button btn btn-primary" @click="submitComment">Post</button>
      </div>
      </div>
    </div>
    </div>
</template>

<style scoped>
@import 'https://unpkg.com/video.js@7/dist/video-js.min.css';
@import 'https://unpkg.com/@videojs/themes@1/dist/forest/index.css';

.user_name{
    font-size:14px;
    font-weight: bold;
}
.comments-list .media{
    border-bottom: 1px dotted #ccc;
}
.wholePage{
    margin-left: 25px;
    margin-right: 25px;
    margin-top: 50px;
    
}
.center-middle{
    margin-top: auto;
    margin-bottom: auto;
}
.video-title{
    font-weight: bold;
}
video {
  width: 100%;
  max-width: 100% !important;
  height: auto;
}
.unloaded-thumbnail{
  max-height: 50vh;
  width: auto;
}
</style>

<script>
  // Similarly, you can also introduce the plugin resource pack you want to use within the component
  // import 'some-videojs-plugin'
  export default {
    data() {
      return {
          posts: [],
          vInfo: {},
          id: "",
          comment: "",
          uri: "",
        playerOptions: {
          // videojs options
         
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2],
          width: '100%',
          height: '100%',
          sources: [{
            type: "video/mp4",
            src: this.$apiIp + "/video2/" + this.$route.query.id,
          }],
          poster: this.$apiIp + "/thumbnails/" + this.$route.query.id,
        }
      }
    },
    created() {
        this.uri = this.$apiIp;
        this.vInfo.transcoding = true;
        this.getVideoInfo();
        this.getAllPosts();
        this.id = this.$route.query.id;
    },
    
    methods: {
      getVideoInfo(){
          this.axios.get(this.$apiIp + "/posts/vinfo/" + this.$route.query.id).then((res) =>{
              this.vInfo = res.data;
              if(this.vInfo.transcoding){
                this.sleep(3000);
                console.log(this.$router.name);
                if(this.$route.name == 'video'){
                  this.getVideoInfo();
                }
              }
          })
      },
      sleep(ms) {
        return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    },
    getAllPosts(){
          this.axios.get(this.$apiIp + "/posts/").then((res) =>{
              this.posts = res.data.reverse().slice(0, 4);
          })
      },
      like(){
          this.axios.get(this.$apiIp + "/posts/like/" + this.$route.query.id).then((res) =>{
              this.vInfo = res.data;
          })
      },
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