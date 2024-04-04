<template>
  <div class="music-player">
    <div class="song-info">{{ currentSong.title }}</div>
    <div class="album-cover">
      <img :src="currentSong.albumCover" alt="Album Cover">
    </div>
    <div class="controls">
      <button @click="playPrev"><i class="fas fa-step-backward"></i></button>
      <button @click="togglePlayPause"><i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i></button>
      <button @click="playNext"><i class="fas fa-step-forward"></i></button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const playlist = ref([
  { id: 1, title: "Song 1", albumCover: "song1.jpg", url: "song1.mp3" },
  { id: 2, title: "Song 2", albumCover: "song2.jpg", url: "song2.mp3" },
  { id: 3, title: "Song 3", albumCover: "song3.jpg", url: "song3.mp3" }
])

const currentSong = ref(playlist.value[0])
const isPlaying = ref(false)

const togglePlayPause = () => {
  isPlaying.value = !isPlaying.value
}

const playNext = () => {
  const currentIndex = playlist.value.findIndex(song => song.id === currentSong.value.id)
  if (currentIndex !== -1 && currentIndex < playlist.value.length - 1) {
    currentSong.value = playlist.value[currentIndex + 1]
    isPlaying.value = true
  }
}

const playPrev = () => {
  const currentIndex = playlist.value.findIndex(song => song.id === currentSong.value.id)
  if (currentIndex !== -1 && currentIndex > 0) {
    currentSong.value = playlist.value[currentIndex - 1]
    isPlaying.value = true
  }
}
</script>

<style scoped>
.music-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.song-info {
  font-size: 18px;
  margin-bottom: 10px;
}

.album-cover img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.controls button {
  background: none;
  border: none;
  margin: 0 10px;
  font-size: 24px;
  color: #333;
}

.controls button i {
  display: inline-block;
}

.controls button i:hover {
  color: #007bff;
}
</style>
