async function restoreOptions (event) {
  event.preventDefault()
  const form = document.forms.options
  const res = await browser.storage.local.get()

  form.elements['tab-limit'].value = res['tab-limit'] || defaultOptions['tab-limit']
  form.elements.which.value = res.which || defaultOptions.which
  form.elements.ignorePinned.checked = res.ignorePinned || defaultOptions.ignorePinned
}

async function saveOptions (event) {
  event.preventDefault()
  const form = document.forms.options
  await browser.storage.local.set({
    'tab-limit': form.elements['tab-limit'].valueAsNumber || defaultOptions['tab-limit'],
    which: form.elements.which.value || defaultOptions.which,
    ignorePinned: form.elements.ignorePinned.checked || defaultOptions.ignorePinned
  })
}

async function backToDefault () {
  await browser.storage.local.clear()
}

document.addEventListener('DOMContentLoaded', restoreOptions)
document.getElementById("save-button").addEventListener("click", saveOptions)
document.getElementById("default-button").addEventListener("click", backToDefault)
