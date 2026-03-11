# Flujos

<script setup>
import flows from './data/flows.json'
</script>

<div v-for="flow in flows" style="border:1px solid #ddd; padding:16px; border-radius:10px; margin-bottom:16px;">
  <h3>{{ flow.name }}</h3>
  <p><strong>ID:</strong> {{ flow.id }}</p>
  <p>{{ flow.description }}</p>
</div>