# Templates

<script setup>
import { computed, ref } from 'vue'
import templates from './data/templates.json'

const search = ref('')
const selectedAgency = ref('All')
const selectedFlow = ref('All')
const selectedChannel = ref('All')
const selectedLanguage = ref('All')

const agencies = computed(() => ['All', ...new Set(templates.map(t => t.agency))])
const flows = computed(() => ['All', ...new Set(templates.map(t => t.flow))])
const channels = computed(() => ['All', ...new Set(templates.map(t => t.channel))])
const languages = computed(() => ['All', ...new Set(templates.map(t => t.language))])

const filteredTemplates = computed(() => {
  return templates.filter(template => {

    const matchesSearch =
      template.title.toLowerCase().includes(search.value.toLowerCase())

    const matchesAgency =
      selectedAgency.value === 'All' || template.agency === selectedAgency.value

    const matchesFlow =
      selectedFlow.value === 'All' || template.flow === selectedFlow.value

    const matchesChannel =
      selectedChannel.value === 'All' || template.channel === selectedChannel.value

    const matchesLanguage =
      selectedLanguage.value === 'All' || template.language === selectedLanguage.value

    return matchesSearch && matchesAgency && matchesFlow && matchesChannel && matchesLanguage
  })
})

function copyText(content){
  navigator.clipboard.writeText(content)
  alert("Template copied!")
}
</script>

<style>

.filters{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
gap:12px;
margin:20px 0 30px 0;
}

.input,.select{
width:100%;
padding:10px;
border:1px solid #ccc;
border-radius:8px;
}

.card{
border:1px solid #ddd;
padding:20px;
border-radius:10px;
margin-bottom:30px;
}

.header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:10px;
}

.channel{
padding:4px 10px;
border-radius:20px;
font-size:12px;
font-weight:600;
}

.email{
background:#e8f1ff;
color:#2563eb;
}

.sms{
background:#fff7ed;
color:#ea580c;
}

.whatsapp{
background:#dcfce7;
color:#16a34a;
}

.tags{
margin-bottom:10px;
}

.tag{
background:#f3f3f3;
padding:4px 8px;
margin-right:6px;
border-radius:6px;
font-size:12px;
}

.preview{
border:1px solid #ccc;
margin-top:15px;
height:500px;
width:100%;
border-radius:8px;
}

.textPreview{
background:#f7f7f7;
padding:15px;
border-radius:8px;
margin-top:15px;
white-space:pre-wrap;
font-family:monospace;
}

.button{
display:inline-block;
margin-top:10px;
padding:6px 12px;
background:#3e63dd;
color:white;
border-radius:6px;
text-decoration:none;
font-size:13px;
margin-right:10px;
}

.copy{
background:#22c55e;
}

</style>

<div class="filters">

<input v-model="search" class="input" placeholder="Search templates">

<select v-model="selectedAgency" class="select">
<option v-for="agency in agencies">{{agency}}</option>
</select>

<select v-model="selectedFlow" class="select">
<option v-for="flow in flows">{{flow}}</option>
</select>

<select v-model="selectedChannel" class="select">
<option v-for="channel in channels">{{channel}}</option>
</select>

<select v-model="selectedLanguage" class="select">
<option v-for="language in languages">{{language}}</option>
</select>

</div>

<div v-for="template in filteredTemplates" class="card">

<div class="header">

<h3>{{template.title}}</h3>

<span
class="channel"
:class="{
email: template.channel === 'Email',
sms: template.channel === 'SMS',
whatsapp: template.channel === 'WhatsApp'
}">
{{template.channel}}
</span>

</div>

<div class="tags">
<span class="tag">{{template.agency}}</span>
<span class="tag">{{template.flow}}</span>
<span class="tag">{{template.language}}</span>
</div>

<div v-if="template.type === 'html'">

<a :href="template.file" target="_blank" class="button">
Open Full Template
</a>

<iframe
class="preview"
:src="template.file">
</iframe>

</div>

<div v-if="template.type === 'text'">

<button
class="button copy"
@click="copyText(template.content)">
Copy Template
</button>

<div class="textPreview">
{{template.content}}
</div>

</div>

</div>