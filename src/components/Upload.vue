<template>
  <center>
    <div class="card upload-card">
      <h5 class="card-header" style="background-color: #1e2934">
        Upload Video
      </h5>
      <div class="card-body" style="background-color: #404e5b">
        <div class="form-group">
          <label for="exampleFormControlInput1"><h5>Video Title</h5></label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            style="color: white; background-color: #505f6d; border: none"
            v-model="post.title"
            placeholder="Title"/>
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1"><h5>Description</h5></label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="post.description"
            style="color: white; background-color: #505f6d; border: none"></textarea>
        </div>
      </div>
      <div class="file-upload" style="margin-bottom: 15px">
        <input type="file" @change="onFileChange" />
        <div class="progress">
          <div
            class="progress-bar"
            role="progressbar"
            v-bind:style="'width:' + progress + '%;'"
            v-bind:aria-valuenow="progress"
            aria-valuemin="0"
            aria-valuemax="100">
            {{ progress }}%
          </div>
        </div>
        <br />
        <button @click="onUploadFile" class="upload-button btn btn-primary">
          Upload file
        </button>
      </div>
    </div>
  </center>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: {},
      post: {},
      progress: 0,
    };
  },
  methods: {
    onFileChange(e) {
      if (
        e.target.files[0].name
          .substring(e.target.files[0].name.lastIndexOf("."))
          .toLowerCase() == ".mp4" ||
        e.target.files[0].name
          .substring(e.target.files[0].name.lastIndexOf("."))
          .toLowerCase() == ".mov" ||
        e.target.files[0].name
          .substring(e.target.files[0].name.lastIndexOf("."))
          .toLowerCase() == ".wmv" ||
        e.target.files[0].name
          .substring(e.target.files[0].name.lastIndexOf("."))
          .toLowerCase() == ".flv" ||
        e.target.files[0].name
          .substring(e.target.files[0].name.lastIndexOf("."))
          .toLowerCase() == ".avi" ||
        e.target.files[0].name
          .substring(e.target.files[0].name.lastIndexOf("."))
          .toLowerCase() == ".webm" ||
        e.target.files[0].name
          .substring(e.target.files[0].name.lastIndexOf("."))
          .toLowerCase() == ".mkv" ||
        e.target.files[0].name
          .substring(e.target.files[0].name.lastIndexOf("."))
          .toLowerCase() == ".m4v"
      ) {
        this.selectedFile = e.target.files[0];
      } else {
        alert("Please only upload .mp4 or .mov files!");
      }
    },
    onUploadFile() {
      const formData = new FormData();
      formData.append("title", this.post.title);
      formData.append("description", this.post.description);
      formData.append("file", this.selectedFile); // appending file
      console.log(formData);
      // sending file to the backend
      this.axios
        .post(this.$apiIp + "/posts/upload", formData, {
          onUploadProgress: (ProgressEvent) => {
            let progress = Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            );
            this.progress = progress;
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.upload-card {
  width: 28rem;
  margin-top: 25px;
  background-color: #404e5b;
}
.progress{
  margin-left: 20px; 
  margin-right: 20px; 
  background-color: #505f6d;
}
</style>