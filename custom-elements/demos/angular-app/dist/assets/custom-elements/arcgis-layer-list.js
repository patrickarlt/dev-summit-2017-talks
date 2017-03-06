require([
  'esri/widgets/LayerList'
], function (LayerList) {
  class ArcGISLayerListElement extends HTMLElement {
    static get observedAttributes () {
      return ['webmap'];
    }

    constructor () {
      super();
      this.style.display = 'block';
      this.container = document.createElement('div');
    }

    connectedCallback () {
      this.appendChild(this.container);
      this.list = new LayerList({
        container: this.container
      });

      this.setupLayerList();
    }

    disconnectedCallback () {
      this.removeChild(this.container);
    }

    attributeChangedCallback (attribute, oldValue, newValue) {
      if (attribute === 'webmap') {
        if (newValue || !newValue && oldValue) {
          this.setupLayerList();
        }
      }
    }

    get webmap () {
      return this.getAttribute('webmap');
    }

    set webmap (value) {
      this.setAttribute('webmap', value);
    }

    setupLayerList () {
      if (this.webmap) {
        const webmap = document.getElementById(this.webmap);
        if(webmap && webmap.view && this.list) {
          this.list.view = webmap.view;
        }
      }
    }
  }

  customElements.define('arcgis-layer-list', ArcGISLayerListElement);
});
