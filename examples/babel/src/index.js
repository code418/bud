import '@src/app.css'

document.querySelector('#root')?.classList.add('init')

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(console.error)
}

export {}
