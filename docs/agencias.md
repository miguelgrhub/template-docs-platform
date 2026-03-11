# Agencias

<script setup>
import agencies from './data/agencies.json'
</script>

<div v-for="agency in agencies" style="border:1px solid #ddd; padding:16px; border-radius:10px; margin-bottom:16px;">
  <h3>{{ agency.name }}</h3>
  <p><strong>ID:</strong> {{ agency.id }}</p>
  <p>{{ agency.description }}</p>
</div>