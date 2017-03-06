require([
  'esri/widgets/BasemapToggle/BasemapToggleViewModel'
], function (BasemapToggleViewModel) {
  class ArcGISBasemapToggleElement extends HTMLElement {
    static get observedAttributes () {
      return ['webmap', 'basemap'];
    }

    constructor () {
      super();
      this.style.display = 'block';
      this.button = document.createElement('button');
      this.button.textContent = 'Toggle';
    }

    connectedCallback () {
      this.viewModel = new BasemapToggleViewModel();
      this.setupViewModel();
      this.appendChild(this.button);
      this.addEventListener('click', this.handleClick);
    }

    disconnectedCallback () {
      this.removeEventListener('click', this.handleClick);
      this.removeChild(this.button);
      if (this.boundViewHandler && this.webmap) {
        const webmap = document.getElementById(this.webmap);
        webmap.removeEventListener('arcigswebmapsetup', this.boundViewHandler);
      }
    }

    attributeChangedCallback (attribute, oldValue, newValue) {
      if (attribute === 'basemap' && this.viewModel && newValue) {
        this.viewModel.nextBasemap = this.basemap;
      }

      this.setupViewModel();
    }

    setupViewModel () {
      if (this.webmap && this.basemap) {
        const webmap = document.getElementById(this.webmap);
        if (webmap && webmap.view && this.viewModel) {
          this.viewModel.nextBasemap = this.basemap;
          this.viewModel.view = webmap.view;
          if (this.boundViewHandler) {
            webmap.removeEventListener('arcigswebmapsetup', this.boundViewHandler);
          }
        } else if (webmap) {
          this.boundViewHandler = this.setupViewModel.bind(this);
          webmap.addEventListener('arcigswebmapsetup', this.boundViewHandler);
        }
      }
    }

    handleClick () {
      this.viewModel.toggle();
    }

    get webmap () {
      return this.getAttribute('webmap');
    }

    set webmap (value) {
      this.setAttribute('webmap', value);
    }

    get basemap () {
      return this.getAttribute('basemap');
    }

    set basemap (value) {
      this.setAttribute('basemap', value);
    }
  }

  customElements.define('arcgis-basemap-toggle', ArcGISBasemapToggleElement);
});
