<script setup>
  import { computed, ref } from 'vue';

  const alphabet = {
    '.-': 'A',
    '-...': 'B',
    '-.-.': 'C',
    '-..': 'D',
    '.': 'E',
    '..-.': 'F',
    '--.': 'G',
    '....': 'H',
    '..': 'I',
    '.---': 'J',
    '-.-': 'K',
    '.-..': 'L',
    '--': 'M',
    '-.': 'N',
    '---': 'O',
    '.--.': 'P',
    '--.-': 'Q',
    '.-.': 'R',
    '...': 'S',
    '-': 'T',
    '..-': 'U',
    '...-': 'V',
    '.--': 'W',
    '-..-': 'X',
    '-.--': 'Y',
    '--..': 'Z',
  }
  
  const fromText = ref('');
  const toText = computed(() => {
    return fromText.value.replaceAll('_', '-').replaceAll('─', '-').split(' ').map(e => {
      if (typeof alphabet[e] === undefined || e === ' ') return '';
      return alphabet[e];
    }).join('');
  });

  function checkMorse(e) {
    if (/[\.\-_\s─]+/.test(String.fromCharCode(e.keyCode))) return true;
    e.preventDefault();
  }
</script>

<template>
  <div class="container">
    <div class="input from">
      <label for="from">Morse</label>
      <textarea name="from" id="from" cols="30" rows="10" v-model="fromText" @keypress="checkMorse"></textarea>
    </div>
    <div class="input to">
      <label for="from">Text</label>
      <textarea name="to" id="to" cols="30" rows="10" :value="toText"></textarea>
    </div>
  </div>
</template>

<style scoped>
  .container .input label {
    display: block;
  }
</style>
