//___________________________________
//  ОТРИСОВКА ЭЛЕМЕНТОВ НА СТРАНИЦЕ
//___________________________________

export default class Section {
    constructor ({data, renderer}, containerSelector) {
        this._items = data
        this._renderer = renderer
        this._container = document.querySelector(containerSelector)
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderItems() {
        this._items.forEach(item => {
            this.renderItem(item) 
          });
    }
    
    renderItem(item) {
        this._renderer(item); 
    }
}