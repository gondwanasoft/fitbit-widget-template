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
    const setNewTextAll = (obj, prop) => {
        Object.defineProperty(obj, prop, {
            set(newValue) {mainEl[prop] = shadowEl[prop] = newValue;},
            enumerable: true
        });
    };

    setNewTextAll(el, 'text');
    setNewTextAll(el, 'textAnchor');
    setNewTextAll(el, 'letterSpacing');

    //APPLY TEXT-STYLE CHANGES TO ALL
    const setNewStyleAll = (obj, prop) => {
        Object.defineProperty(obj, prop, {
            set(newValue) {mainEl.style[prop] = shadowEl.style[prop] = newValue;},
            enumerable: true
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
                set(newValue) { styleBase.fill = newValue; },
                enumerable: true
            });
        }
    };

    let mainAPI = Object.seal({
        style: Object.seal(new StyleSubText(mainEl.style)),
        getBBox: () => mainEl.getBBox()
    });

    let effectsAPI = (obj) => Object.seal({
        style: Object.seal(new StyleSubText(obj.style)),
        set x(newValue) { obj.x = newValue; },
        set y(newValue) { obj.y = newValue; },
        enumerable: true
    });

    let widgetStyleAPI = Object.seal(new StyleWidget(elStyle));

    Object.defineProperty(el, 'style', {  // we kept a reference to the real .style in elStyle
        get() {
            return widgetStyleAPI;
        }
    });

    // Exposes property and returns all values to owner
    const defineProps = (prop, obj) => {
        Object.defineProperty(el, prop, {
            get() { return obj; }
        });
    };

    defineProps('main', mainAPI);
    defineProps('shadow', effectsAPI(shadowEl));

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
    })();//IIFE

    return el;
};

constructWidgets('myWidgetType', construct);
// TODO 3.1 reduce to minimal example elements, properties, etc
// TODO 3.2 comment out elements, properties, etc.