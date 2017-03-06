<!-- .slide: data-background="../template/images/Slide1.png" -->

# Custom Elements and <br> Shadow DOM
### Cross-framework Web Development

<br>

#### Patrick Arlt | [@patrickarlt](https://twitter.com/patrickarlt)
#### Slides: http://bit.ly/2lZU2lI
#### Code: http://bit.ly/2mkyqRN

---

I'm starting to notice something about JavaScript Frameworks&hellip;

---

### Angular 2

```html
<delete-button [item]="..." (click)="..."></delete-button>
```

### React

```html
<DeleteButton item="..." onClick="..." />
```

### Ember

```html
{{delete-button item="..." onclick="..."}}
```

### Vue.js

```html
<delete-button item="..." v-on:click="..."><delete-button>
```

---

## Common Framework Features

* Manage a tree of components
* Pass data down through the tree
* Listen for events on the component tree

---

Wait a sec isn't this just the DOM?

---

## Enter Web Components

Web Components allow creating custom HTML tags like our `<delete-button>`. But natively without a framework.

* Custom Elements
* Shadow DOM
* Templates
* HTML Imports

---

# Custom Elements

Register custom HTML tags with the browser.

---

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

### Custom Element and The JS API

By combining custom elements and the JS API we can make reusable mapping components that we can custom HTML Elements and share across frameworks.

* `<arcgis-web-map>`
* `<arcgis-layer-list>`
* `<arcgis-basemap-toggle>`

---

### `<arcgis-web-map>`

A simple custom element for displaying a web map.

[Demo](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/custom-elements-map.html)

---

### `<arcgis-layer-list>`

Wrap the `LayerList` widget from the JS API in a custom element.

[Demo](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/custom-elements-layer-list.html)

---

### `<arcgis-basemap-toggle>`

Instead of wrapping the existing `BasemapToggle` widget, lets impliment `BasemapToggleViewModel` and make a custom toggle.

[Demo](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/custom-elements-basemap-toggle.html)

---

## 2 Problems

* Change the content of our toggle?
* Isolate the implimentation details of our components?

---

# Shadow DOM

* **Isolate** (hide) DOM inside components
* **Scope** CSS inside components
* **Compose** external DOM and interal DOM

---

# Shadow DOM : Isolation

```js
const container = document.createElement('div');
const shadowRoot = container.attachShadow({ mode: 'closed' });
document.body.appendChild(container);

const link = document.createElement('a');
shadowRoot.appendChild(link);

const allLinks = document.querySelectorAll('a');
console.log(allLinks);  // => []
```

[Demo](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/shadow-dom-isolation.html)

---

# Shadow DOM : Scoped CSS

```html
<style>
  button {
    padding: 1rem;
    background: lightgreen;
    border: 3px solid green;
  }
</style>

<script>
  const container = document.createElement('div');
  const shadowRoot = container.attachShadow({ mode: 'closed' });
  document.body.appendChild(container);

  shadowRoot.innerHTML = `
    <style>
      button {
        padding: 1rem 2.5rem;
        background: lightcyan;
        border: 3px solid cyan;
      }
    </style>

    <button>Inside Shadow DOM</button>
  `
  shadowRoot.appendChild(button);
</script>

<button>Outside Shadow DOM</button>
```

[Demo](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/shadow-dom-scoped-css.html)

---

# Shadow DOM : Composition

```html
<template id="panel-template">
  <style>
    .panel {
      display: block;
      border: solid 3px gray;
      border-radius: 0.5rem;
      padding: 0.5rem;
      background: lightgray
    }
  </style>
  <div class="panel">
    <slot></slot>
  </div>
</template>
<div id="panel">
  <p>Content of the panel.</p>
</div>
<script>
const template = document.getElementById('panel-template');
const panel = document.getElementById('panel');
const shadowRoot = panel.attachShadow({ mode: 'closed' });
shadowRoot.appendChild(template.content.cloneNode(true))
</script>
```

[Demo](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/shadow-dom-composition.html)

---

### `<arcgis-basemap-toggle>`

Now lets use Shadow DOM to isolate the implimentation details of our `<arcgis-basemap-toggle>`.

[Demo](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/custom-element-with-shadow-dom.html)

---

## Quick Review

* 3 custom element
* Isolated implimentation details
*

---

## Consuming Components in Framworks

* [React](http://patrickarlt.com/dev-summit-2017-talks/custom-elements/demos/react-app/build/)
* [Angular]()

---

# Practical Web Components

---

## Modern Browser Support

| | Chrome | Safari | Firefox | Edge |
| --- | --- | --- | --- | --- |
| Custom Elements | ✓ | ✓ | [In-Dev](https://platform-status.mozilla.org/#shadow-dom) | [Dev Soon](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/shadowdom/) |
| Shadow DOM | ✓ | ✓ | [In-Dev](https://platform-status.mozilla.org/#custom-elements) | [Dev Likely](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/customelements/) |
| Templates | ✓ | ✓ | ✓ | ✓ |
| HTML Imports | ✓ | ✕ | ✕ | ✕ |

---

## Using Custom Elements Today

1. Polyfill the spec
  * [Web Components polyfill](https://github.com/webcomponents/custom-elements)
  * [Lightweight ~3k polyfill](https://github.com/WebReflection/document-register-element)
2. Compile Custom Element code with Babel or TypeScript
  * Makes the new ES2015 class syntax work.

---

## Use Cases for Custom Elements

The best use case for Custom Elements remains sharing code amoung differnt sites, frameworks and apps.

Don't make apps with Custom Elements. Make UI components.

---

## Custom Elements on developers.arcgis.com

Components allow us to bundle the same logic amoung the differnt build systems that make up the site.

* `<developers-download-button>`
* `<developers-sign-in>`
* `<developers-search>`
* Ect&hellip; ~16 elements total

---

## Using Shadow DOM Today

No stable polyfills. Waiting on [ShadyDOM](https://github.com/webcomponents/shadydom) for implimenting the API and [ShadyCSS](https://github.com/webcomponents/shadycss) for CSS scoping. No stable version of either polyfill, and both have some bugs.

---

## The Future of Shadow DOM

Given time the polyfills will stabalize and all major browser vendors will support Shadow DOM.

---

## The Future of HTML Imports

Just like with Shadow DOM and Custom Elements there will probally be a new revision of the HTML Imports spec that can be polyfilled and implimented by browsers.

---

# Bright Future

* Shadow DOM will get wide support
* Custom Elements is easy to use and polyfill
* HTML Imports will get a revision

---

<!-- .slide: data-background="../template/images/Slide4.png" -->

# Thank You!

* Slides: http://bit.ly/2lZU2lI
* Code: http://bit.ly/2mkyqRN

### Leave Feedback

* Download the Esri Events App
* Go to Dev Summit
* Select "CSS for Geographers"
* Leave a Review!

---

<!-- .slide: data-background="../template/images/Slide6.png" -->
