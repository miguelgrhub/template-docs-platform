# Canales

<script setup>
import channels from './data/channels.json'
</script>

<div v-for="channel in channels" style="border:1px solid #ddd; padding:16px; border-radius:10px; margin-bottom:16px;">
  <h3>{{ channel.name }}</h3>
  <p><strong>ID:</strong> {{ channel.id }}</p>
  <p>{{ channel.description }}</p>
</div>