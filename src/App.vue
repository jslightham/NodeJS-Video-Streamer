<template>
  <div id="app">
    <div id="content">
    <b-navbar toggleable="lg" type="dark" style="background-color: #1e2934">
    <b-navbar-brand href="/">NodeJS Video Streamer</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="Upload">Upload</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <form action="/" method="GET">
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search" name="q" style="background-color: #505f6d; border: none"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </form>
        </b-nav-form>

        
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
<transition
        name="fade"
        mode="out-in"
      >
    <router-view></router-view>
</transition>


  </div>
  </div>
  
</template>

<script>


export default {
  name: 'app'
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #32404e;
  height: 100%;
  color: white;
  position: relative;
  min-height: 100vh;
}
html{
  background-color: #343a40;
}
</style>
