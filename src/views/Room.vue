<template>
  <div>
    Lobby
    {{mockRoom}}
  </div>
</template>

<script>
export default {
  name: "Room",

  data: () => ({
    mockRoom: {
      "messageType": "room",
      "payload": {
        "currentRound": "0",
        "language": "spanish",
        "playersWhoGuessed": [],
        "remainingTime": "10",
        "scores": {
          "juampi": 0
        },
        "status": "waiting",
        "totalRounds": "10",
        "totalTime": "60",
        "whoIsDrawing": "juampi",
        "word": "word"
      }
    }
  }),

}
</script>

<style scoped>

</style>
