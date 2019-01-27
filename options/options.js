async function restoreOptions (event) {
  event.preventDefault()
  const form = document.forms.options
  const res = await browser.storage.local.get()

  for(let [key, value] of Object.entries(res)) {
    form.elements[key].value = value || defaultOptions[key]
  }
}

async function saveOptions (event) {
  event.preventDefault()
  const form = document.forms.options
  await browser.storage.local.set({
    limit: form.elements.limit.valueAsNumber || defaultOptions.limit,
    which: form.elements.which.value || defaultOptions.which
  })
}

async function backToDefault () {
  await browser.storage.local.clear()
}

document.addEventListener('DOMContentLoaded', restoreOptions)
document.getElementById("save-button").addEventListener("click", saveOptions)
document.getElementById("default-button").addEventListener("click", backToDefault)
