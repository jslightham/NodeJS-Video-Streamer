<script setup>
export default {
  components: {},
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
  },
};
</script>

<template>
  <div>
    <div class="card vid-card" v-for="post in posts" :key="post._id" style="">
      <h5 class="card-header" style="background-color: #1e2934">
        {{ post.title }}
      </h5>
      <img
          class="card-img-top"
          v-bind:src="uri + '/thumbnails/' + post._id"
          alt="Video Thumbnail"/>
      <div class="card-body" style="background-color: #404e5b">
        <p class="card-text">{{ post.description }}</p>
        <b-link v-bind:to="'/video?id=' + post._id" class="btn btn-lg btn-primary">Watch</b-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vid-card{
  width: 18rem;
  height: 27rem;
  color: white;
  margin-left: 25px;
  margin-bottom: 25px;
  margin-top: 25px;
  border: none;
  display: inline-flex;
}
</style>
