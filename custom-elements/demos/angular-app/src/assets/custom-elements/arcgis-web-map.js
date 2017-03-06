require([
  "esri/views/MapView",
  "esri/WebMap"
], function (MapView, WebMap) {

  class ArcGISWebMapElement extends HTMLElement {
    static get observedAttributes () {
      return ['webmapid'];
    }

    constructor () {
      console.log('webmap constructor');
      super();
      this.container = document.createElement('div');
      this.container.style.width = '100%';
      this.container.style.height = '100%';
      this.style.display = 'block';
    }

    connectedCallback () {
            console.log('webmap connectedCallback');

      this.appendChild(this.container);
      this.view = new MapView({
        container: this.container
      });

      this.setup();
    }

    disconnectedCallback () {
      console.log('webmap disconnectedCallback');
      this.removeChild(this.container);
      this.view.destroy();
    }

    attributeChangedCallback (attribute, oldValue, newValue) {
      console.log('attributeChangedCallback', attribute, oldValue, newValue);
      if (attribute === 'webmapid') {
        if (newValue || !newValue && oldValue) {
          this.map = new WebMap({
            portalItem: {
              id: this.webmapid
            }
          });

          this.setup();
        }
      }
    }

    get webmapid () {
      return this.getAttribute('webmapid');
    }

    set webmapid (value) {
      this.setAttribute('webmapid', value);
    }

    setup () {
      if (this.map && this.view) {
        this.view.map = this.map;
        this.dispatchEvent(new CustomEvent('arcigswebmapsetup',{
          bubbles: true,
          cancelable: true
        }));
      }
    }
  }

  customElements.define('arcgis-web-map', ArcGISWebMapElement);

});
