<template>
  <q-page class="flex flex-center orbit-front-page">
    <PageTitle text="Dashboard"/>
    <div class="card-holder text-center">
      <q-card v-for="(q, i) in navigationCards" v-bind:key="i" v-bind:class="{'navigation-card-animation-down': i % 2 === 0, 'navigation-card-animation-up': i % 2 !== 0}">
        <q-card-section>
          <div class="text-h6">{{q.title}}</div>
        </q-card-section>
        <q-card-section>
            <q-icon :name="q.icon" size="10em"/>
        </q-card-section>
        <q-separator />
      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat>
            {{q.reserve}}
        </q-btn>
        <q-btn flat>
          {{q.time}}
        </q-btn>
        <q-btn v-bind:to="q.to" flat color="primary">
          Navigate
        </q-btn>
      </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import PageTitle from "../components/PageTitle";
export default {
  name: 'PageIndex',
  components: {PageTitle},
  data(){
    return{
      navigationCards:[
        {
          icon:"storage",
          title: "Databases",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          to: "/databases"
        },
        {
          icon:"cloud_queue",
          title: "Cloud Diagram",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          time: "5:30PM",
        },
        {
          icon: "multiline_chart",
          title: "Service Monitoring",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          time: "5:30PM",
        },
        {
          icon: "school",
          title: "Docs",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          time: "5:30PM",
        }
      ]
    }
  }

}
</script>
<style type="text/css">
  .orbit-front-page {
    background: url("~src/assets/orbit-background.jpg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.75;
  }

  .card-holder {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    gap: 3em;
    padding: 3em;
  }

  .navigation-card-animation-up {
    animation: slideUp;
    animation-duration: 1.5s;
  }

  @keyframes slideUp {
    from {
      transform: translateY(-1000px);
    }
    to {
      transform: translateY(0px);
    }
  }


  .navigation-card-animation-down{
      animation: slideDown;
    animation-duration: 1.5s;
  }

  @keyframes slideDown {
    from {
      transform: translateY(1000px);
    }
    to {
      transform: translateY(0px);
    }
  }
</style>
