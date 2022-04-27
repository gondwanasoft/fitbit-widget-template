# fitbit-widget-template

This project provides a framework that can be used to create reusable visual components ('widgets') for Fitbit OS clockfaces and apps.

Places where the code needs to be customised are marked with `TODO` code comments. A suggested sequence is given below.

The project also includes sample code that demonstrates how to populate the framework to create a widget, and how to use such a widget in a host project. Such code is provided in comment blocks marked with `EXAMPLE`. The capabilities (*eg*, API) implemented in the example code is documented below.

## Files

Files that need to be customised to create your widget:
* app/widgets/my-widget-type/index.js
* resources/widgets/my-widget-type/index.view
* resources/widgets/my-widget-type/styles.css *(optional)*

File that needs to be distributed with your widget, but which shouldn't need to be customised:
* app/widgets/construct-widgets.js

Files that are not a part of your widget but which demonstrate how to host and use a widget:
* app/index.js
* resources/index.view
* resources/styles.css
* resources/widget.defs

## Suggested Approach

Before coding, decide:
- what visual SVG elements are needed
- what attributes you want to be able to define in SVG (.view) and CSS (you don't need to consider standard attributes that can be applied directly to the `<use>` element)
- what properties and methods (*ie*, API) you'll need to allow manipulation of the widget in JavaScript at runtime (you don't need to consider standard properties and methods that can be applied directly to [GraphicsElement](https://dev.fitbit.com/build/reference/device-api/document/#interface-graphicselement) objects because widget objects already implement that interface).

Populate the framework provided here with code for your widget. Here's a suggested order (numbers correspond to TODO comments):

- 1 Rename my-widget-type (directory names and all references in code files) to something appropriate for your widget.
- 2 Rename myWidgetType (in all code files) to something appropriate for your widget.
- 3 Add `class="widget-manual"` to the symbol if you don't want widget instances to be constructed automatically (see note below).
- 4 Declare one or more SVG elements. They can be different element types.
- 5 Don't include a `config` element unless you need it for SVG/CSS declarations.
- 6 Don't import `parseConfig` if you don't use a `config` element in your widget.
- 7 If your widget doesn't use `config`, remove the call to `parseConfig()`.
- 8 If your widget doesn't include any default styles, delete the link to its CSS file.
- 9 Define default styles (if any) for your widget.
- 10 Define private variables and functions, and public properties and methods, for your widget.
- 11 If you use `config`, define cases to handle the attributes.
- 12 Perform any other necessary initialisation; *eg*, responding to SVG/CSS attributes/styles.

To test the widget or host one or more instances of it in a clockface/app:
- 13 In your `<svg>`, declare `<use>` elements for every instance of the widget that you need.
- 14 Widget styles can be defined or over-ridden in the clockface/app .css.
- 15 Unless your widgets are static, include code in your clockface/app .js to manipulate them.

## Widget Construction and the `widget-manual` Style

Before they can be used, widgets need to be constructed (see `app/widgets/my-widget-type/index.js`).

The framework provided here normally initiates construction of all widget instances when the clockface/app starts. This is usually preferable and allows widgets to be used very similarly to built-in Fitbit SVG elements and components.

Automatic construction may be undesirable if the SVG document is large and/or if different SVG documents are dynamically loaded at runtime. Including the style `widget-manual` in the widget template or instances will prevent automatic construction. At present, no method is provided to perform on-demand widget construction (*coming soon*).

## `config` Element

The Fitbit build process does not allow the use of [custom element data attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*) in SVG or CSS. Moreover, many predefined attribute names (*eg*, `text`) can't be applied to the `<use>` element that specifies widget instances in `.view` files.

To get around these limitations, this framework includes an optional `config` text element that can be used to specify attributes with arbitary names. While the syntax for this is a bit ugly (although related to the HTML [`style`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/style) attribute), it provides great flexibility. `config` can be used in `.view` and `.css` files; examples are included in this repository.

If you don't need to use `config`, all code associated with it can be removed.

## Example Capabilities

The `EXAMPLE` code (commented out) implements the capabilities described in this section.

Most of the widget's code is for `style` interfaces for the widget and its child elements. This could be simplified, but the goal was to make the widget as simple as possible to use (*ie*, as consistent as possible with standard Fitbit SVG elements). API members that affect the whole widget are implemented by the widget object itself, whereas members that only affect one child element are implemented by that element. Closures are used to limit access to private variables, which reduces the likelihood of non-widget code breaking the widget.

Attributes applicable to `<use>` element in `.view` and `.css`:
- `x`, `y` and other members of `GraphicsElement`
- `font-family`
- `font-size`

Attributes applicable to `config` element in `.view` and `.css`:
- `text`
- `text-anchor`
- `letter-spacing`

Properties and method applicable to widget object in `.js`:
- `x`, `y` and other members of `GraphicsElement`
- `text`
- `textAnchor`
- `letterSpacing`
- `style`
- `main`
- `shadow`
- `getBBox()`

Properties applicable to widget `.style` object in `.js`:
- `opacity`
- `display`
- `fontFamily`
- `fontSize`

Property and method applicable to widget `.main` object in `.js`:
- `style`
- `getBBox()`

Properties applicable to widget `.shadow` object in `.js`:
- `x`, `y`
- `style`

Properties applicable to widget `.main.style` and `.shadow.style` objects in `.js`:
- `opacity`
- `display`
- `fill`

## Distribution

If you develop a widget that's free for other developers to use, please consider submitting it to [Fitbit's ossapps repo](https://github.com/Fitbit/ossapps#widgets). Note that there's a specific section for widgets.

## Support

For help with widget development, post in the [Fitbit SDK forum](https://community.fitbit.com/t5/SDK-Development/bd-p/sdk) or [Discord](https://discord.com/channels/355793206182412290/799557720758943754).

## Acknowledgement and Other Examples

The approach to widget creation presented here was developed collaboratively between [BarbWire](https://github.com/BarbWire-1) and Gondwana Software, with input from [Sergio Morchón Poveda](https://github.com/SergioMorchon).

The template and example code in this repository is based on BarbWire's [fitbit-3D-text repository](https://github.com/BarbWire-1/fitbit-3D-text). That repository provides a more detailed example.

Other examples of widgets that use a similar approach:
- [BarbWire's curved-text](https://github.com/BarbWire-1/curved-text)
- [Gondwana's fitbit-text-rect](https://github.com/gondwanasoft/fitbit-text-rect)
- [Gondwana's fitbit-slider-widget](https://github.com/gondwanasoft/fitbit-slider-widget)
- [Gondwana's fitbit-polyline](https://github.com/gondwanasoft/fitbit-polyline)
- [Gondwana's fitbit-simple-widget](https://github.com/gondwanasoft/fitbit-simple-widget) *(includes NiVZ's `progress-arc-smart` widget)*

