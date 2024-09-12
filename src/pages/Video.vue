<template>
    <div class="wholePage">
      <div class="row">
        <div class="col-sm-5 center-middle">
          <video-info v-info="vInfo" />
          <br>
          <recent-video-list posts="posts" />
        </div>
        <div class="col-sm-7 center-middle">
          <br>
          <video-p id="id" v-info="vInfo" uri="uri" />
        </div>
      </div>
      <br>
      <comments v-info="vInfo" />
    </div>
</template>

<style scoped>
@import 'https://unpkg.com/video.js@7/dist/video-js.min.css';
@import 'https://unpkg.com/@videojs/themes@1/dist/forest/index.css';

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

video {
  width: 100%;
  max-width: 100% !important;
  height: auto;
}

.user_name{
  font-size:14px;
  font-weight: bold;
}
</style>

<script>
  import VideoInfo from "@/components/video/VideoInfo.vue";
  import Comments from "@/components/video/Comments.vue"
  import RecentVideoList from "@/components/video/RecentVideoList.vue";
  import VideoP from "@/components/video/VideoP.vue"

  export default {
    components: {RecentVideoList, VideoInfo, Comments, VideoP},
    data() {
      return {
          posts: [],
          vInfo: {},
          id: "",
          comment: "",
          uri: "",
        playerOptions: {
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
    }
  }
</script>