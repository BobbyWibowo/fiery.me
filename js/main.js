/* global Swal, ClipboardJS */

const page = {
  swalContainer: null,
  isClipboardJSSupported: false,
  clipboardJS: null
}

function doDiscordItem() {
  const item = document.querySelector('#discord')
  if (!item) return

  const text = item.dataset.text
  if (!text) return

  const swalOptions = {
    icon: 'info',
    title: 'Discord',
    html: `<code>${text}</code>`,

    confirmButtonText: 'Copy to clipboard',
    confirmButtonAriaLabel: text,
    showConfirmButton: page.isClipboardJSSupported,
    focusConfirm: page.isClipboardJSSupported
  }

  item.addEventListener('click', function () {
    Swal.fire(swalOptions)
  })
}

function doEmailItem() {
  const item = document.querySelector('#email')
  if (!item) return

  const text = item.dataset.text
  if (!text) return

  const swalOptions = {
    icon: 'info',
    title: 'Email',
    html: `<code>${text}</code>`,

    confirmButtonText: 'Copy to clipboard',
    confirmButtonAriaLabel: text,
    showConfirmButton: page.isClipboardJSSupported,
    focusConfirm: page.isClipboardJSSupported,

    denyButtonText: 'Send me an email',
    denyButtonAriaLabel: text,
    showDenyButton: true
  }

  item.addEventListener('click', function () {
    Swal.fire(swalOptions)
      .then(function (result) {
        if (result.isDenied) {
          window.location = `mailto:${text}`
        }
      })
  })
}

function initClipboardJS() {
  if (!page.isClipboardJSSupported) return

  page.clipboardJS = new ClipboardJS('button.swal2-confirm', {
    container: '.swal2-container',
    text: function (target) {
      return target.getAttribute('aria-label')
    }
  })
    .on('success', function () {
      Swal.fire({
        icon: 'success',
        title: 'Copied to clipboard!',
        showConfirmButton: false,
        timer: 1500
      })
    })
}

window.addEventListener('DOMContentLoaded', () => {
  page.isClipboardJSSupported = ClipboardJS.isSupported()

  doDiscordItem()

  doEmailItem()

  initClipboardJS()
})
