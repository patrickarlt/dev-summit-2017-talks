require([
  'esri/widgets/BasemapToggle/BasemapToggleViewModel'
], function (BasemapToggleViewModel) {
  class ArcGISBasemapToggleElement extends HTMLElement {
    static get observedAttributes () {
      return ['webmap', 'basemap'];
    }

    constructor () {
      super();
      const shadowRoot = this.attachShadow({ mode: 'closed' });
      shadowRoot.innerHTML = `
        <style>
          .panel {
            padding: .5rem;
            background: white;
          }
        </style>
        <div class="panel">
          <slot></slot>
        </div>
      `;
    }

    connectedCallback () {
      this.viewModel = new BasemapToggleViewModel();
      this.setupViewModel();
      this.addEventListener('click', this.handleClick);
    }

    disconnectedCallback () {
      this.removeEventListener('click', this.handleClick);
      if (this.boundViewHandler && this.webmap) {
        const webmap = document.getElementById(this.webmap);
        webmap.removeEventListener('arcigswebmapviewready', this.boundViewHandler);
      }
    }

    attributeChangedCallback (attribute, oldValue, newValue) {
      if (attribute === 'webmap' && newValue) {
        this.setupViewModel();
      }

      if (attribute === 'basemap' && this.viewModel && newValue) {
        this.viewModel.nextBasemap = this.basemap;
      }
    }

    setupViewModel () {
      if (this.webmap && this.basemap) {
        const webmap = document.getElementById(this.webmap);
        if (webmap && webmap.view && this.viewModel) {
          console.log('setup');
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
      debugger;
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
