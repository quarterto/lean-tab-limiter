const reactToNewTab = async tab => {
  const res = await browser.storage.local.get()
  const limit = res['tab-limit'] || defaultOptions['tab-limit']
  const which = res.which || defaultOptions.which
  const ignorePinned = res.ignorePinned || defaultOptions.ignorePinned

  const tabs = await browser.tabs.query({
    currentWindow: true,
    pinned: ignorePinned ? false : undefined
  })

  if (tabs.length > limit) {
    switch(which) {
      case 'newest': {
        return browser.tabs.remove(tab.id)
      }

      case 'least-recently-used': {
        const leastRecent = tabs.reduce(
          (least, tab) => tab.lastAccessed < least.lastAccessed ? tab : least,
          {lastAccessed: Infinity}
        )

        return browser.tabs.remove(leastRecent.id)
      }
    }
    
  }
}

browser.tabs.onCreated.addListener(reactToNewTab)
