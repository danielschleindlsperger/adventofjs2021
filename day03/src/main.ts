import './style.css'

Array.from(document.querySelectorAll('.piano a')).forEach((button, i) => {
  const audio = new Audio(`/audio/key-${i + 1}.mp3`)
  button.addEventListener('click', () => {
    audio.play()
  })
})
