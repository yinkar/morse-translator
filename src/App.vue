<script setup>
  import { computed, ref } from 'vue';
  import _ from 'lodash';

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
  };

  const reverseAlphabet = _.invert(alphabet);

  const removeAccents = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  const fromMorse = ref('');
  const toText = computed(() => {
    return fromMorse.value
      .replace(/[_─]/g, '-')
      .replace(/[^\.\-_\s─\/]|[\n]*/g, '')
      .split('/')
      .map(w => {
        return w.split(' ')
        .map(c => {
            if (typeof alphabet[c] === undefined) return '';
            return alphabet[c];
        }).join('');
      }).join(' ');
  });

  const fromText = ref('');
  const toMorse = computed(() => {
    return removeAccents(fromText.value)
      .toUpperCase()
      .split('')
      .map(c => {
        if (typeof reverseAlphabet[c] === undefined) return '';
        if (c === ' ') return '/';
        return reverseAlphabet[c];
      })
      .join(' ');
  });

  function checkMorse(e) {
    if (/[\.\-_\s─\/]+/.test(String.fromCharCode(e.keyCode))) return true;
    e.preventDefault();
    return false;
  }

  function checkAlpha() {
    return true;
  }
</script>

<template>
  <div class="container">
    <div class="input from">
      <label for="fromMorse">Morse</label>
      <textarea name="fromMorse" id="fromMorse" cols="40" rows="5" v-model="fromMorse" @keypress="checkMorse"></textarea>
    </div>
    <div class="input to">
      <label for="toText">Text</label>
      <textarea name="toText" id="toText" cols="40" rows="5" :value="toText"></textarea>
    </div>
  </div>

  <div class="container">
    <div class="input from">
      <label for="fromText">Text</label>
      <textarea name="fromText" id="fromText" cols="40" rows="5" v-model="fromText" @keypress="checkAlpha"></textarea>
    </div>
    <div class="input to">
      <label for="toMorse">Morse</label>
      <textarea name="toMorse" id="toMorse" cols="40" rows="5" :value="toMorse"></textarea>
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
