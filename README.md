# fitbit-widget-template

This project provides a framework that can be used to create reusable visual components ('widgets') for Fitbit OS clockfaces and apps.

Places where the code needs to be customised are marked with `TODO` code comments. A suggested sequence for this is given below.

The project also includes sample code that demonstrates how to populate the framework to create a widget, and how to use such a widget in a host project. Such code is provided in comment blocks marked with `EXAMPLE`.

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

TODO 3.0 readme approach

Before coding, think about what SVG attributes and JS API you want your widget to have.

List suggested TODO order.

## Widget Construction and the `widget-manual` Style

Before they can be used, widgets need to be constructed (see `app/widgets/my-widget-type/index.js`).

The framework provided here normally initiates construction of all widget instances when the clockface/app starts. This is usually preferable and allows widgets to be used very similarly to built-in Fitbit SVG elements and components.

Automatic construction may be undesirable if the SVG document is large and/or if different SVG documents are dynamically loaded at runtime. Including the style `widget-manual` in the widget template or instances will prevent automatic construction. At present, no method is provided to perform on-demand widget construction (*coming soon*).

## `config` Element

The Fitbit build process does not allow the use of [custom element data attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*) in SVG or CSS. Moreover, many predefined attribute names (*eg*, `text`) can't be applied to the `<use>` element that specifies widget instances in `.view` files.

To get around these limitations, this framework includes an optional `config` text element that can be used to specify arbitary attributes. While the syntax for this is a bit ugly (although similar to the HTML [`style`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/style) attribute), it provides great flexibility. `config` can be used in `.view` and `.css` files; examples are included in this repository.

If you don't need to use `config`, all code associated with it can be removed.

## Example API

TODO 3.0 readme example

Document example API. Most code is for style. It could be simplified, but the goal was to make the widget as simple as possible to use (ie, as consistent as possible with native Fitbit SVG elements).

## Distribution

If you develop a widget that's free for other developers to use, please consider submitting it to [Fitbit's ossapps repo](https://github.com/Fitbit/ossapps#widgets). Note that there's a specific section for widgets.

## Support

For help with widget development, post in the [Fitbit SDK forum](https://community.fitbit.com/t5/SDK-Development/bd-p/sdk) or [Discord](https://discord.com/channels/355793206182412290/799557720758943754).

## Acknowledgement and Other Examples

The approach to widget creation presented here was developed collaboratively between BarbWire and Gondwana Software.

The template and example code in this repository is based on BarbWire's [fitbit-3D-text widget](https://github.com/BarbWire-1/fitbit-3D-text). That repository provides a more detailed example.

Other examples of widgets that use a similar approach:
- [BarbWire's curved-text](https://github.com/BarbWire-1/curved-text)
- [Gondwana's fitbit-text-rect](https://github.com/gondwanasoft/fitbit-text-rect)
- [Gondwana's fitbit-slider-widget](https://github.com/gondwanasoft/fitbit-slider-widget)
- [Gondwana's fitbit-polyline](https://github.com/gondwanasoft/fitbit-polyline)
- [Gondwana's fitbit-simple-widget](https://github.com/gondwanasoft/fitbit-simple-widget) *(includes NiVZ's `progress-arc-smart` widget)*

