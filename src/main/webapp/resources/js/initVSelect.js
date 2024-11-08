function initVirtualSelect(element, options, placeholder, selectFirst) {
  if ($(element).hasClass('vscomp-ele')) {
    if (typeof element == 'object') {
      element.destroy();
    } else {
      document.querySelector(element).destroy();
    }
  }
  VirtualSelect.init({
    ele: element,
    options: options,
    multiple: false,
    autoSelectFirstOption: selectFirst,
    autofocus: true,
    placeholder: placeholder,
    search: true,
    searchGroup: false,
    searchByStartsWith: false,
    searchPlaceholderText: "Căutare...",
    noSearchResultsText: 'Niciun rezultat',
    keepAlwaysOpen: false,
  })
}

