// TODO Rename my-widget-type (directory names and all references in code files) to something appropriate for your widget.
// TODO Rename myWidgetType (in all code files) to something appropriate for your widget.

import { constructWidgets, parseConfig } from "../construct-widgets";

// Defaults are in widgets/my-widget-type/styles.css.
// This allows them to get overwritten from main CSS if set there.

const construct = (el) => {

    let mainEl = el.getElementById('my-widget-type-main');
    let shadowEl = el.getElementById('my-widget-type-shadow');
    let elStyle = el.style;   // keep a reference to the REAL .style because we're going to redefine .style

    //APPLY CHANGES ON EL TO ALL
    // TODO 3.02 simplify/eliminate setNewTextAll()
    const setNewTextAll = (obj, prop) => {
        Object.defineProperty(obj, prop, {
            set(newValue) {mainEl[prop] = shadowEl[prop] = newValue;}
        });
    };

    setNewTextAll(el, 'text');
    setNewTextAll(el, 'textAnchor');
    setNewTextAll(el, 'letterSpacing');

    //APPLY TEXT-STYLE CHANGES TO ALL
    // TODO 3.03 simplify/eliminate setNewStyleAll()
    const setNewStyleAll = (obj, prop) => {
        Object.defineProperty(obj, prop, {
            set(newValue) {mainEl.style[prop] = shadowEl.style[prop] = newValue;}
        });
    };

    class StyleCommon {     // style properties common to all elements
        constructor(styleBase) {
            // styleBase: the Fitbit API style object that implements things.
            // We're using the constructor as a closure; ie, local variables (including the parameter) shouldn't be exposed publicly.
            // This necessitates putting properties and functions that need such variables in the constructor, which is a bit ugly.
            Object.defineProperty(this, 'opacity', {
                set(newValue) { styleBase.opacity = newValue; },
                enumerable: true
            });
            Object.defineProperty(this, 'display', {
                set(newValue) { styleBase.display = newValue; },
                enumerable: true
            });
        }
    };

    class StyleWidget extends StyleCommon {   // style properties applicable to widget (useElement)
        constructor(elStyle) {
            super(elStyle);
            setNewStyleAll(this, 'fontFamily');
            setNewStyleAll(this, 'fontSize');
        }
    };

    class StyleSubText extends StyleCommon {  // style properties applicable to all textElements
        constructor(styleBase) {
            super(styleBase);
            Object.defineProperty(this, 'fill', {
                set(newValue) { styleBase.fill = newValue; }
            });
        }
    };

    let mainAPI = Object.seal({
        style: Object.seal(new StyleSubText(mainEl.style)),
        getBBox: () => mainEl.getBBox()
    });

  let shadowAPI = Object.seal({
      style: Object.seal(new StyleSubText(shadowEl.style)),
      // TODO 3.01 replace x,y with shadowX,Y or something as per circle cx,cy? First, see if x,y can be set on shadow in use/CSS.
      set x(newValue) {shadowEl.x = newValue;},
      set y(newValue) {shadowEl.y = newValue;}
  });

    let widgetStyleAPI = Object.seal(new StyleWidget(elStyle));

    Object.defineProperty(el, 'style', {  // redefine style; we kept a reference to the real .style in elStyle
        get() {return widgetStyleAPI;}
    });

    // Define public properties (widget API):
    Object.defineProperty(el, 'main', {
      get() {return mainAPI;}
    });

    Object.defineProperty(el, 'shadow', {
      get() {return shadowAPI;}
    });

    // INITIALISATION:
    (function () {
        // PARSE AND PROCESS SVG CONFIG ATTRIBUTES
        // TODO If your widget doesn't use config, you can remove the call to parseConfig() below.
        parseConfig(el, attribute => {
          switch(attribute.name) {
            // Names don't have to be standard Fitbit or CSS strings; you can make up your own names.
            case 'text':
                el.text = attribute.value;   // this won't like embedded semi-colons, and quotes will require care
                break;
            case 'letter-spacing':
                el.letterSpacing = Number(attribute.value);
                break;
            case 'text-anchor':
                el.textAnchor = attribute.value;
                break;
          }
        });

        // DEFINES RELATIONS BETWEEN TEXT ELEMENTS
        // TODO 3.05 simplify:
        const allSubTextElements = el.getElementsByClassName('my-widget-type-text');
        allSubTextElements.forEach(e => {
            //e.text = mainEl.text ?? "shadow-text";        // Removed because text is set on useEl via config, and not on main
            //e.letterSpacing = mainEl.letterSpacing ?? 0;  // Removed because letter-spacing is set on useEl via config, and not on main
            e.style.fontFamily = elStyle.fontFamily;        // because font-family is set on useEl
            /* // Removed because text-anchor is set on useEl via config, and not on main
            try {     // textEl.textAnchor throws an error if textAnchor not defined
                e.textAnchor = mainEl.textAnchor;
            } catch (e) {
               e.textAnchor = 'start';
            }*/
            //console.log(`anchor=${elStyle.textAnchor}; spacing=${elStyle.letterSpacing}`);
            e.style.fontSize = elStyle.fontSize > 0 ? elStyle.fontSize : 30;   // because font-family is set on useEl; if fontSize is undefined its value is -32768
        });
    })();   // IIFE

    return el;
};

constructWidgets('myWidgetType', construct);
// TODO 3.1 reduce to minimal example elements, properties, etc. Consider avoiding style.
// TODO 3.2 comment out elements, properties, etc.
// TODO 3.7 comments!