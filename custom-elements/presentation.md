<!-- .slide: data-background="../template/images/Slide1.png" -->

# Custom Elements and <br> Shadow DOM
### Cross-framework Web Development

<br>

#### Patrick Arlt | [@patrickarlt](https://twitter.com/patrickarlt)
#### Slides: http://bit.ly/2lZU2lI
#### Code: http://bit.ly/2mkyqRN

---

<!-- .slide: data-background="../template/images/Slide2.png" -->

I'm starting to notice something about JavaScript Frameworks&hellip;

---

<!-- .slide: data-background="../template/images/Slide2.png" -->

```html
<!-- Angular 2 -->
<delete-button [item]="..." (click)="..."></delete-button>
```

```html
<!-- Ember -->
{{delete-button item="..." onclick="..."}}
```

```html
<!-- React -->
<DeleteButton item="..." onClick="..." />
```

```html
<!-- Vue JS -->
<delete-button item="..." v-on:click="..."><delete-button>
```

---

<!-- .slide: data-background="../template/images/Slide2.png" -->

## JavaScript Frameworks are all the same&hellip;

* Manage a tree of components
* Pass data down through the tree
* Listen for events on the component tree

---

<!-- .slide: data-background="../template/images/Slide2.png" -->

## Wait a sec isn't this just the DOM?

---

<!-- .slide: data-background="../template/images/Slide4.png" -->

## Enter Web Components

Web Components allow creating custom HTML tags like our <br>`<delete-button>`. But without a framework.

---

<!-- .slide: data-background="../template/images/Slide4.png" -->

## The Web Component Standards

* Custom Elements
* Shadow DOM
* Templates
* HTML Imports

---

<!-- .slide: data-background="../template/images/Slide4.png" -->

### Custom Elements

Register custom HTML tags with the browser.

---

<!-- .slide: data-background="../template/images/Slide4.png" -->

```js
// Custom Element Definition
class MyElement extends HTMLElement {
  // return an array of the attribute names you want to watch for changes.
  static get observedAttributes() {
    return ['attribute'];
  }

  // called when the element is first created. You must call `super()`
  constructor () {
    super();
  }

  // called when the element is added to the DOM
  connectedCallback () { }

  // called when the element is removed from the DOM
  disconnectedCallback () { }

  // called when one of your `observedAttributes` changes
  attributeChangedCallback (attr, oldValue, newValue) { }
}

// first parameter is the tag name, second is the class
customElements.define('my-element', MyElement);
```

---

<!-- .slide: data-background="../template/images/Slide4.png" -->

### Custom Element and The JS API

By combining custom elements and the JS API we can make reusable mapping components that we can custom HTML Elements and share across frameworks.

* `<arcgis-web-map>`
* `<arcgis-layer-list>`
* `<arcgis-basemap-toggle>`

---

<!-- .slide: data-background="../template/images/Slide4.png" -->

### `<arcgis-web-map>`

A simple custom element for displaying a web map.

[Demo](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/custom-elements-map.html)

---

<!-- .slide: data-background="../template/images/Slide4.png" -->

### `<arcgis-layer-list>`

Wrap the `LayerList` widget from the JS API in a custom element.

[Demo](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/custom-elements-layer-list.html)

---

<!-- .slide: data-background="../template/images/Slide4.png" -->

### `<arcgis-basemap-toggle>`

Instead of wrapping the existing `BasemapToggle` widget, lets impliment `BasemapToggleViewModel` and make a custom toggle.

[Demo](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/custom-elements-basemap-toggle.html)

---

<!-- .slide: data-background="../template/images/Slide4.png" -->

### 2 Problems

* Change the content of our toggle?
* Isolate the implimentation details of our components?

---

<!-- .slide: data-background="../template/images/Slide5.png" -->

## Shadow DOM

Reduce the "global" nature of JavaScript, CSS and HTML.

* **Isolate** internal DOM inside components - [Demo](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/shadow-dom-isolation.html)
* **Scope** CSS inside components - [Demo](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/shadow-dom-scoped-css.html)
* **Compose** external DOM and interal DOM - [Demo](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/shadow-dom-composition.html)

---

<!-- .slide: data-background="../template/images/Slide5.png" -->

### `<arcgis-basemap-toggle>`

Shadow DOM isolates the DOM and CSS of our <br>`<arcgis-basemap-toggle>`.

[Demo](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/custom-element-with-shadow-dom.html)

---

<!-- .slide: data-background="../template/images/Slide5.png" -->

## Quick Review

* 3 custom elements
* Isolated DOM and CSS

---

<!-- .slide: data-background="../template/images/Slide2.png" -->

## Web Components in Framworks

* [React](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/react-app/build/)
* [Angular](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/angular-app/dist/)

---

<!-- .slide: data-background="../template/images/Slide2.png" -->

## Modern Browser Support

| | Chrome | Safari | Firefox | Edge |
| --- | --- | --- | --- | --- |
| Custom Elements | ✓ | ✓ | [In-Dev](https://platform-status.mozilla.org/#shadow-dom) | [Dev Soon](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/shadowdom/) |
| Shadow DOM | ✓ | ✓ | [In-Dev](https://platform-status.mozilla.org/#custom-elements) | [Dev Likely](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/customelements/) |
| Templates | ✓ | ✓ | ✓ | ✓ |
| HTML Imports | ✓ | ✕ | ✕ | ✕ |

---

<!-- .slide: data-background="../template/images/Slide2.png" -->

## Using Custom Elements Today

1. Polyfill the spec
  * [Web Components polyfill](https://github.com/webcomponents/custom-elements)
  * [Lightweight ~3k polyfill](https://github.com/WebReflection/document-register-element)
2. Compile with Babel or TypeScript
  * Makes the new ES2015 class syntax work

---

<!-- .slide: data-background="../template/images/Slide2.png" -->

## Use Cases for Custom Elements

Custom Elements are best for sharing code amoung different sites, frameworks and apps.

Don't make apps make UI components.

---

<!-- .slide: data-background="../template/images/Slide2.png" -->

## Custom Elements on ArcGIS for Developers

Share code amoung the differnt build systems and tools

* `<developers-download-button>`
* `<developers-sign-in>`
* `<developers-search>`
* Ect&hellip; ~16 elements total

---

<!-- .slide: data-background="../template/images/Slide2.png" -->

## Using Shadow DOM Today

No stable polyfills. Waiting on [ShadyDOM](https://github.com/webcomponents/shadydom) for implimenting the API and [ShadyCSS](https://github.com/webcomponents/shadycss) for CSS scoping. No stable version of either polyfill, and both have some bugs.

---

<!-- .slide: data-background="../template/images/Slide2.png" -->

## The Future of Shadow DOM

Polyfills will stabalize and major browser vendors will support Shadow DOM.

---

<!-- .slide: data-background="../template/images/Slide2.png" -->

## Bright Future

* Shadow DOM will get wide support
* Custom Elements is easy to use and polyfill

---

<!-- .slide: data-background="../template/images/Slide4.png" -->

# Thank You!

* Slides: http://bit.ly/2lZU2lI

### Leave Feedback

* Download the Esri Events App
* Go to Dev Summit
* Select "Custom Elements and Shadow DOM:<br>Cross-framework Web Development"
* Leave a Review!

---

<!-- .slide: data-background="../template/images/Slide6.png" -->
