// TODO Rename my-widget-type (directory names and all references in code files) to something appropriate for your widget.
// TODO Rename myWidgetType (in all code files) to something appropriate for your widget.

import { constructWidgets, parseConfig } from "../construct-widgets";   // TODO Don't import parseConfig if you don't use a config element in your widget.

const construct = (el) => {
  // el: the element object returned by getElementsByTypeName().

  // TODO Define private variables and functions, and public properties and methods, for your widget.
  /* EXAMPLE
  // Get references to the widget's child elements that we'll need to manipulate:
  const mainEl = el.getElementById('my-widget-type-main');
  const shadowEl = el.getElementById('my-widget-type-shadow');

  // Construct objects for the various style APIs.
  // This is fairly intricate because we use an object-oriented approach to avoid duplication.

  const elStyle = el.style;   // keep a reference to the REAL .style because we're going to over-ride .style

  const defineStyleProperty = (obj, prop) => {      // defines a property on el.style that is applied to both text sub-elements
    Object.defineProperty(obj, prop, {
      set(newValue) {mainEl.style[prop] = shadowEl.style[prop] = newValue;}
    });
  };

  class StyleCommon {     // style properties common to all elements (virtual base class)
    constructor(styleBase) {
      // styleBase: the Fitbit API style object that implements things.
      // We're using the constructor as a closure so that local variables (including the parameter) won't be exposed publicly.
      // This necessitates putting properties and functions that need such variables in the constructor, which is a bit ugly.
      Object.defineProperty(this, 'opacity', {
        set(newValue) { styleBase.opacity = newValue; }
      });
      Object.defineProperty(this, 'display', {
        set(newValue) { styleBase.display = newValue; }
      });
    }
  };

  class StyleWidget extends StyleCommon {   // style properties applicable to widget (<use>)
    constructor(elStyle) {
      super(elStyle);
      defineStyleProperty(this, 'fontFamily');
      defineStyleProperty(this, 'fontSize');
    }
  };

  class StyleSubText extends StyleCommon {  // style properties applicable to both textElements
    constructor(styleBase) {
      super(styleBase);
      Object.defineProperty(this, 'fill', {
        set(newValue) {styleBase.fill = newValue;}
      });
    }
  };

  // API members that apply to the main text element:

  let mainAPI = Object.seal({
    style: Object.seal(new StyleSubText(mainEl.style)),   // property
    getBBox: () => mainEl.getBBox()                       // method (ie, function)
  });

  // API members that apply to the shadow text element:

  let shadowAPI = Object.seal({
    style: Object.seal(new StyleSubText(shadowEl.style)),   // property
    // shadow.x and .y are relative to (ie, offsets from) the main text element:
    set x(newValue) {shadowEl.x = newValue;},               // property
    set y(newValue) {shadowEl.y = newValue;}                // property
  });

  let widgetStyleAPI = Object.seal(new StyleWidget(elStyle));

  // API members that apply to the widget element (<use>) itself:

  Object.defineProperty(el, 'style', {  // redefine style; we kept a reference to the real .style in elStyle
    get() {return widgetStyleAPI;}
  });

  Object.defineProperty(el, 'main', {
    get() {return mainAPI;}
  });

  Object.defineProperty(el, 'shadow', {
    get() {return shadowAPI;}
  });

  const defineTextProperty = (prop) => {      // define a property on el that is applied to both text sub-elements
    Object.defineProperty(el, prop, {
      set(newValue) {mainEl[prop] = shadowEl[prop] = newValue;}
    });
  };

  defineTextProperty('text');

  defineTextProperty('textAnchor');

  defineTextProperty('letterSpacing');

  el.getBBox = () => {    // this public method over-rides getBBox for the <use> element, which isn't useful
    const mainBBox = mainEl.getBBox();
    return {  // this assumes shadowEl.x and shadowEl.y are not negative!
      bottom: mainBBox.bottom + shadowEl.y,
      height: mainBBox.height + shadowEl.y,
      left: mainBBox.left,
      right: mainBBox.right + shadowEl.x,
      top: mainBBox.top,
      width: mainBBox.width + shadowEl.x,
      x: mainBBox.x,
      y: mainBBox.y
    }
  }
  */

  // Initialisation:
  (function () {    // we use an IIFE so that its memory can be freed after execution

    // Parse and process any attributes specified in the config element.
    // TODO If your widget doesn't use config, don't include the call to parseConfig() below.
    parseConfig(el, attribute => {
      // This anonymous function is called for every attribute in config.
      // attribute is {name:attributeName, value:attributeValue}
      switch(attribute.name) {
        // Names don't have to be standard Fitbit or CSS strings; you can make up your own names.
        // TODO If you use config, define cases to handle the attributes.
        /* EXAMPLE
        case 'text':
          el.text = attribute.value;   // this won't like embedded semi-colons, and quotes will require care
          break;
        case 'letter-spacing':
          el.letterSpacing = Number(attribute.value);
          break;
        case 'text-anchor':
          el.textAnchor = attribute.value;
          break;
        */
      }
    });

    // TODO Perform any other necessary initialisation; eg, responding to SVG/CSS attributes/styles.
    /* EXAMPLE
    // Apply styles set on <use> element to text elements:
    [mainEl, shadowEl].forEach(e => {
      e.style.fontFamily = elStyle.fontFamily;
      e.style.fontSize = elStyle.fontSize > 0 ? elStyle.fontSize : 30;   // if fontSize is undefined its value is -32768
    });
    */
  })();

  return el;
};

constructWidgets('myWidgetType', construct);

// TODO 3.7 comments!
// TODO 3.8 readme