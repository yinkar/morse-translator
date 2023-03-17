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
    return fromText.value.replaceAll('_', '-').replaceAll('─', '-').replaceAll('\n', '').replaceAll('\r', '').split(' ').map(e => {
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
      <textarea name="from" id="from" cols="40" rows="5" v-model="fromText" @keypress="checkMorse"></textarea>
    </div>
    <div class="input to">
      <label for="from">Text</label>
      <textarea name="to" id="to" cols="40" rows="5" :value="toText"></textarea>
    </div>
  </div>
</template>

<style scoped>
  .container {
    width: 800px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
  }

  .container .input {
    padding: 20px;
  }

  .container .input label {
    display: block;
  }
</style>
