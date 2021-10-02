<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          WELCOME TO THE CHALLENGE
        </h1>

        <p class="subheading font-weight-regular">
          Collect 6 of the codes and then get a prize
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-4 text-center">
        <h3 class="display-2 font-weight-bold mb-3">Question</h3>

        <p class="subheading font-weight-regular">
          {{ server_result.quiz.Question }}
        </p>

        <v-btn
          block
          class="ma-3"
          v-for="answer in server_result.quiz.Answers"
          :key="answer"
          color="primary"
          @click="checkRes(answer)"
        >
          {{ answer }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <h3>{{ code }}</h3>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",

  data: () => ({
    server_result: {},
    code: "",
  }),

  mounted() {
    const params = new URLSearchParams(window.location.search)
    var challenge_id = params.get("id")

    axios.get("http://localhost:3000/api/challenge/" + challenge_id).then((response) => {
      console.log(response.data);
      this.server_result = response.data;      
    });

  },

  methods: {
    checkRes: function (answer) {
      console.log(answer);
      if (answer == this.server_result.quiz.Answers[2]) {
        const randomNumber = Math.floor(Math.random() * 123908);

        this.code =
          "Correct!\nSave this code and enter it in the future: " +
          randomNumber;
      } else {
        this.code = "Wrong try in 1 Hour";
      }
    },
  },
};
</script>
