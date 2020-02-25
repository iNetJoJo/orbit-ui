<template>
  <div class="dashboard-title">
    <h1>{{text}}</h1>
  </div>
</template>

<script>
    export default {
      props:{
          text: String
      },
        name: "PageTitle"
    }
</script>

<style scoped>
  .dashboard-title {
    text-align: center;
    color: aliceblue;
    background-color: rgba(46, 125, 50, 0.85);
    border-radius: 3em;
    animation: fadeIn;
    animation-duration: 3s;
  }

  @keyframes fadeIn {
    from{opacity: 0}
    to{opacity: 1}
  }
</style>
