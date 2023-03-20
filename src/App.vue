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

  const playing = ref(false);

  function playMorseCode(code) {
    const audioCtx = new AudioContext();

    playing.value = true;

    const playSound = (frequency, duration) => {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      gainNode.gain.value = 0.08;
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + duration / 1000);
    };

    let i = 0;
    let delay = 0;
    const playSymbol = () => {
      if (!playing.value) return;

      if (i >= code.length) {    
        playing.value = false;
        return;
      };

      if (code[i] === '.') playSound(440, 100);
      else if (code[i] === '-') playSound(440, 300);
      else if (code[i] === '/') delay += 400;
      
      i++;

      if (i > 0 && code[i - 1] === '.') {
        setTimeout(playSymbol, delay + 200);
      }
      else {
        setTimeout(playSymbol, delay + 350);
      }

      delay = 0;
    };
    
    setTimeout(playSymbol, delay + 300);
  }

  function play() {
    if (playing.value) {
      playing.value = false;
      return;
    }

    if (mode.value === Mode.MORSE_TO_TEXT) {
      playMorseCode(fromMorse.value.replaceAll('_', '-').trim().replace(/[\s]+/g, ' '));
    }
    else if (mode.value === Mode.TEXT_TO_MORSE) {
      playMorseCode(toMorse.value);
    }
  }
</script>

<template>
  <div class="container">
    <div class="switch-panel">
      <div>
        <input @click="play" type="radio" name="mode" id="text-to-morse" v-model="mode" :value="Mode.TEXT_TO_MORSE">
        <label for="text-to-morse">Text to Morse Code</label>
      </div>
      <div>
        <input type="radio" name="mode" id="morse-to-text" v-model="mode" :value="Mode.MORSE_TO_TEXT">
        <label for="morse-to-text">Morse Code to Text</label>
      </div>
    </div>

    <div class="panel" v-if="mode === Mode.TEXT_TO_MORSE">
      <div class="input">
        <label for="fromText">Text</label>
        <textarea name="fromText" id="fromText" v-model="fromText"></textarea>
      </div>
      <div class="output">
        <label for="toMorse">Morse Code</label>
        <textarea class="morse-output" name="toMorse" id="toMorse" :value="toMorse" readonly></textarea>
      </div>
    </div>

    <div class="panel" v-if="mode === Mode.MORSE_TO_TEXT">
      <div class="input">
        <label for="fromMorse">Morse Code</label>
        <textarea class="morse-output" name="fromMorse" id="fromMorse" v-model="fromMorse" @keypress="checkMorse"></textarea>
      </div>
      <div class="output">
        <label for="toText">Text</label>
        <textarea name="toText" id="toText" :value="toText" readonly></textarea>
      </div>
    </div>
  </div>

  <div class="play-panel">
    <button @click="play" class="play-button" :class="{ playing }">

      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="play" clip-path="url(#clip0_2_2)">
      <path id="core" d="M12 3.95799C7.581 3.95799 4 7.54699 4 11.975C4 16.403 7.581 19.992 12 19.992C16.419 19.992 20 16.403 20 11.975C20 7.54699 16.419 3.95799 12 3.95799ZM10 14.981V8.96799L16 12.12L10 14.981Z" fill="#888"/>
      <path id="ring" d="M13 2.004C18.046 2.508 22 6.787 22 11.974C22 13.441 21.676 14.83 21.108 16.087L22.846 17.092C23.578 15.539 24 13.808 24 11.975C24 5.671 19.158 0.511 13 0V2.004ZM2.891 16.087C2.323 14.83 2 13.441 2 11.975C2 6.787 5.954 2.509 11 2.005V0C4.842 0.511 0 5.671 0 11.975C0 13.808 0.421 15.538 1.153 17.093L2.891 16.087ZM20.104 17.821C18.287 20.344 15.335 21.995 12 21.995C8.665 21.995 5.712 20.344 3.895 17.82L2.149 18.83C4.316 21.953 7.917 24 12 24C16.082 24 19.683 21.953 21.851 18.832L20.104 17.821Z" fill="#aaa"/>
      </g>
      </svg>
      
    </button>
  </div>
</template>

<style scoped>
  .container {
    margin: 0 auto;
  }

  .switch-panel {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    width: 100%;
  }

  .switch-panel > div {
    width: 200px;
  }

  .switch-panel input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }

  .switch-panel label {
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
  }

  .switch-panel input[type="radio"]:checked + label {
    background-color: #ddd;
    color: #333;
    border-radius: 15px;
  }

  .panel {
    width: 800px;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }

  .panel textarea {
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

  .panel textarea.morse-output {
    font-family: monospace;
    font-weight: bolder;
  }

  .input label, .output label {
    display: block;
    margin-bottom: 10px;
  }

  .play-panel {
    margin: 0 auto;
    width: 30px;
  }

  .play-button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .play-button:hover svg {
    filter: brightness(1.2);
  }

  .play-button #ring {
    transform-origin: center center;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-fill-mode: none;
    animation-name: playing;
    animation-play-state: paused;
  }

  .play-button.playing #ring {
    animation-play-state: running;
    fill: #ddd;
  }

  @keyframes playing {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media screen and (max-width: 600px) {
    .switch-panel {
      justify-content: center;
      font-size: .75rem;
      width: 300px;
      margin-left: auto;
      margin-right: auto;
    }

    .panel {
      flex-direction: column;
      width: 100vw;
    }

    .input, .output {
      text-align: center;
    }

    .input:first-child {
      margin-bottom: 30px;
    }
  }
</style>
