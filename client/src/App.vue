<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
html{
  height: 100%;
  background: url('./assets/bg.jpg') no-repeat;
  background-size: 100% 100%;
}
#app {
  max-width: 900px;
  margin: 30px auto;
  border-radius: 5px;
  background: #fff;
  padding: 30px;
}
*{
  margin: 0;
  padding: 0;
}
</style>
