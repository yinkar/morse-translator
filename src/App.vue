<script setup>
  import { computed, ref } from 'vue';
  import _ from 'lodash';
  import alphabet from './assets/alphabet.json';

  const Mode = {
    TEXT_TO_MORSE: 0,
    MORSE_TO_TEXT: 1
  };

  const mode = ref(Mode.TEXT_TO_MORSE);

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
      .trim()
      .replace(/[\s]+/g, ' ')
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
  }
</script>

<template>
  <div class="container">
    <div class="panel">
      <div>
        <input type="radio" name="mode" id="text-to-morse" v-model="mode" :value="Mode.TEXT_TO_MORSE">
        <label for="text-to-morse">Text to Morse Code</label>
      </div>
      <div>
        <input type="radio" name="mode" id="morse-to-text" v-model="mode" :value="Mode.MORSE_TO_TEXT">
        <label for="morse-to-text">Morse Code to Text</label>
      </div>
    </div>

    <div class="input-container" v-if="mode === Mode.TEXT_TO_MORSE">
      <div class="input from">
        <label for="fromText">Text</label>
        <textarea name="fromText" id="fromText" v-model="fromText"></textarea>
      </div>
      <div class="input to">
        <label for="toMorse">Morse</label>
        <textarea name="toMorse" id="toMorse" :value="toMorse" readonly></textarea>
      </div>
    </div>

    <div class="input-container" v-if="mode === Mode.MORSE_TO_TEXT">
      <div class="input from">
        <label for="fromMorse">Morse</label>
        <textarea name="fromMorse" id="fromMorse" v-model="fromMorse" @keypress="checkMorse"></textarea>
      </div>
      <div class="input to">
        <label for="toText">Text</label>
        <textarea name="toText" id="toText" :value="toText" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    margin: 0 auto;
  }

  .panel {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    width: 100%;
  }

  .panel > div {
    width: 200px;
  }

  .panel input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }

  .panel label {
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
  }

  .panel input[type="radio"]:checked + label {
    background-color: #ddd;
    color: #333;
    border-radius: 15px;
  }

  .input-container {
    width: 800px;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }

  .input-container textarea {
    background-color: #333;
    color: #fff;
    font-size: 1.1rem;
    padding: 10px;
    box-sizing: border-box;
    width: 390px;
    height: 100px;
    outline: #333;
    border-radius: 20px;
  }

  .input-container .input label {
    display: block;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 600px) {
    .panel {
      justify-content: center;
      font-size: .75rem;
      width: 300px;
      margin-left: auto;
      margin-right: auto;
    }

    .input-container {
      flex-direction: column;
      width: 100vw;
    }

    .input {
      text-align: center;
    }

    .input:first-child {
      margin-bottom: 30px;
    }
  }
</style>
