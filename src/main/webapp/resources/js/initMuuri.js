var grid;
var phPool = [];
var phElem = document.createElement('div');
const configMuuri = {
  dragEnabled: true,
  dragPlaceholder: {
    enabled: true,
    createElement(item) {
      return phPool.pop() || phElem.cloneNode();
    },
    onCreate(item, element) {
    },
    onRemove(item, element) {
      phPool.push(element);
    },
  },
  dragStartPredicate: function (item, event) {
    var allItems = grid.getItems().map(item => item.getElement().getAttribute('data-id'));

    if (app.configDashDrag == false) {
      return false;
    }

    if ($(event.target).hasClass('for-dragging') || $(event.target).parents('.for-dragging').length) {
      return Muuri.ItemDrag.defaultStartPredicate(item, event);
    }
    return false;
  },
  dragSortPredicate: function (item) {
    var result = Muuri.ItemDrag.defaultSortPredicate(item, {action: 'swap', threshold: 50});
    var allItems = grid.getItems().map(item => item.getElement().getAttribute('data-id'));
    var sizeElem = allItems.length - 1;
    //daca e ultimul element, nu trebuie mutat
    return result && result.index === sizeElem ? false : result;
    return result;
  },
  layout: {
    fillGaps: true,
    horizontal: false,
    alignRight: false,
    alignBottom: false,
    rounding: false
  },
  containerClass: 'muuri',
  itemClass: 'muuri-itemDashboard',
  itemVisibleClass: 'muuri-itemDashboard-shown',
  itemHiddenClass: 'muuri-itemDashboard-hidden',
  itemPositioningClass: 'muuri-itemDashboard-positioning',
  itemDraggingClass: 'muuri-itemDashboard-dragging',
  itemReleasingClass: 'muuri-itemDashboard-releasing',
  itemPlaceholderClass: 'muuri-item-placeholder'
};

function initCharts() {
  if (grid != undefined) {
    grid.destroy(true);
  }
  grid = new Muuri('#dashboardGrid', configMuuri);
  grid.on('layoutEnd', function (item, event) {
    layoutEnd(item, event);
  });
  getChartsByUserAsoc();
}

// Librarie - verifica redimensionarea unui element
$(document).ready(function () {
  new ResizeSensor($('#content'), function () {
   // grid.refreshItems().layout();
    //grid.on('layoutEnd', function (items) {
    //  resizeCharts();
    //});
  })
})