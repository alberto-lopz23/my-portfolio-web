const $time = document.querySelector('time')
const $parrafo = document.querySelector('p')
const $input = document.querySelector('input')


const INITIAL_TIME = 60;


let words = [

  "In",
  "the",
  "tranquil",
  "solitude",
  "of",
  "forest",
  "ancient",
  "trees",
  "stood",
  "sentinel",
  "their",
  "gnarled",
  "branches",
  "reaching",
  "towards",
  "heavens",
  "Shafts",
  "sunlight",
  "filtered",
  "through",
  "dense",
  "canopy",
  "casting",
  "a",
  "dappled",
  "pattern",
  "on",
  "floor",
  "below",
  "Birds",
  "chirped",
  "melodiously",
  "songs",
  "echoing",
  "stillness",
  "It",
  "was",
  "place",
  "untouched",
  "by",
  "time",
  "where",
  "nature",
  "whispered",
  "its",
  "secrets",
  "to",
  "those",
  "who",
  "listened",
  "with",
  "reverence"
]
const $game = document.querySelector('#game')
const $results = document.querySelector('#results')
const $wpm = document.querySelector('h3')
const $acuracy = $results.querySelector('h3:last-child')

let currentTime = INITIAL_TIME


initGame()
iniEvent()

function initGame() {
  words = words.toSorted(
    () => Math.random() - 0.5
  ).slice(0, 50);
  currentTime = INITIAL_TIME;

  $time.textContent = INITIAL_TIME;

  $parrafo.innerHTML = words.map((word, index) => {
    const letters = word.split('');

    return `<x-word>
    ${letters
        .map(letter => `<x-letter>${letter}</x-letter>`)
        .join('')}
    </x-word>`;
  }).join('');

  const firstWord = $parrafo.querySelector('x-word')

  firstWord.classList.add('active')
  firstWord.querySelector('x-letter').classList.add('active')



  const intervalId = setInterval(() => {
    currentTime--
    $time.textContent = currentTime

    if (currentTime === 0) {
      clearInterval(intervalId)
      gameOver()
    }
  }, 1000)
}

function iniEvent() {
  document.addEventListener('keydown', () => {
    $input.focus()
  })
  $input.addEventListener('keydown', onKeyDown)
  $input.addEventListener('keyup', onKeyUp)
}

function onKeyDown(event) {
  const $currentWord = $parrafo.querySelector('x-word.active')
  const $currentLetter = $currentWord.querySelector('x-letter.active')

  const { key } = event

  if (key === ' ') {
    event.preventDefault()

    const $nextWord = $currentWord.nextElementSibling
    const $nextLetter = $nextWord.querySelector('x-letter')

    $currentWord.classList.remove('active', 'marked')
    $currentLetter.classList.remove('active')

    $nextWord.classList.add('active')
    $nextLetter.classList.add('active')

    $input.value = ''

    const hasMissedLetters = $currentWord.querySelectorAll('x-letter:not(.correct)').length > 0

    const classToAdd = hasMissedLetters ? 'marked' : 'correct';
    $currentWord.classList.add(classToAdd)
    return
  }

  if (key === 'Backspace') {
    const $prevWord = $currentWord.previousElementSibling
    const $prevLetter = $currentLetter.previousElementSibling

    if (!$prevWord && !$prevLetter) {
      event.preventDefault()
      return
    }

    const $wordMarked = $parrafo.querySelector('x-word.marked')
    if ($wordMarked && !$prevLetter) {
      event.preventDefault()
      $prevWord.classList.remove('marked')
      $prevWord.classList.add('active')

      const $letterToGo = $prevWord.querySelector('x-letter:last-child')

      $currentLetter.classList.remove('active')
      $letterToGo.classList.add('active')

      $input.value = [
        ...$prevWord.querySelectorAll('x-letter.correct, x-letter.incorrect')
      ].map($el => {
        return $el.classList.contains('correct') ? $el.innerText : '*'
      })
        .join('')

    }
  }
}


function onKeyUp() {
  const $currentWord = $parrafo.querySelector('x-word.active')
  const $currentLetter = $currentWord.querySelector('x-letter.active')

  const currentWord = $currentWord.innerText.trim()

  $input.maxLength = currentWord.length;


  const $allLetter = $currentWord.querySelectorAll('x-letter')
  $allLetter.forEach($letter => $letter.classList.remove('correct', 'incorrect'))

  $input.value.split('').forEach((char, index) => {
    const $letter = $allLetter[index]
    const letterToCheck = currentWord[index]


    const isCorrect = char === letterToCheck
    const letterClass = isCorrect ? 'correct' : 'incorrect'
    $letter.classList.add(letterClass)
  })

  $currentLetter.classList.remove('active')
  const inputLength = $input.value.length
  const $nextActiveLetter = $allLetter[inputLength]

  if ($nextActiveLetter) {
    $nextActiveLetter.classList.add('active', 'is-last')
  } else {
    $currentLetter.classList.add('active', 'is-last')
  }

  $allLetter[inputLength].classList.add('active')


}


function gameOver() {
  $game.style.display = 'none'
  $results.style.display = 'flex'

  const correctWords = $parrafo.querySelectorAll('x-word.correct').length
  const correctLetters = $parrafo.querySelectorAll('x-letter.correct').length
  const incorrectLetter = $parrafo.querySelectorAll('x-letter.incorrect').length

  const totalLetters = correctLetters + incorrectLetter;
  const accuracy = totalLetters > 0 
  ? (correctLetters / totalLetters) * 100 
  : 0

  const wpm = correctWords * 60 / 10;
  $wpm.textContent = wpm;
  $acuracy.textContent = `${accuracy.toFixed(2)}%`
}




