<template>
  <div style="margin-top: 25px; text-align: center">
    <div v-if="!posts.length" style="text-align: center">No videos found!</div>
    <video-list />
  </div>
</template>

<script>
import VideoList from "@/components/VideoList.vue";

export default {
  components: {VideoList},
  data() {
    return {
      posts: [],
      uri: "",
    };
  },
  created() {
    this.uri = this.$apiIp;
    // If there is a query, call the query function
    if (!this.$route.query.q) 
      this.getAllPosts();
    else 
      this.getQueryPosts();
  },
  methods: {
    // Get the data for all videos
    getAllPosts() {
      this.axios.get(this.$apiIp + "/posts/").then((res) => {
        this.posts = res.data;
        this.posts.map(post => {
            if(post.description.length > 100){
              post.description = post.description.substring(0, 100);
            }
            return post;
          })
      });
    },
    // Get the data for the query
    getQueryPosts() {
      let msg = {};
      msg.query = this.$route.query.q;
      this.axios.post(this.$apiIp + "/posts/search", msg).then((res) => {
          this.posts = res.data;
          this.posts.map(post => {
            if(post.description.length > 175){
              post.description.substring(0, 175);
            }
            return post;
          })
        });
    },
  },
};
</script>

<style scoped>

</style>