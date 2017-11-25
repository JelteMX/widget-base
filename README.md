Widget Base
===

**Note: this widget is setup is part of the new Widget Generator. Easier to scaffold a new widget, it will set the names for you: [JelteMX/generator-mendix-widget](https://github.com/JelteMX/generator-mendix-widget)**

This Mendix widget is generated through Webpack. It packs ES6 notation, ESLint and other techniques in one simple setup.

## Installation

1.  Download this repository or clone it using git
2.  Run the following command to install dependencies:

    ```bash
    yarn
    ```
    (or use `npm install` if you do not have yarn installed)

3.  Build the widget using the following command:

    ```bash
    yarn run build
    ```

4.  If you want to automatically build when changing files, run:

    ```bash
    yarn run dev
    ```

## Configuration

The following things can be configured:

| What | Where | Comments |
| --- | --- | --- |
| Package name | Change the `widget.package` in `package.json` | Make sure this is the same as the name of the widget folder in `src`. So if your package would be called _AwesomeWidgetPackage_, the folder *AwesomeWidgetPackage* should be in `src` folder. |
| Version | Change the `version` in `package.json` | You do not have to change this anywhere. It will end up in `package.xml` and the property `_WIDGET_VERSION` in your widget (this can be used later on in a project to identify the version) |
| Use core | Change `widget.core` in `package.json` | Do you have multiple widgets in your widget package that share a codebase? You can use `Core.js` in you widget folder as this base and have the other widgets use this as their `widgetBase`. Make sure you set `widget.core` to *true* |
| Use libraries | Change `widget.libraries` in `package.json` | If you have multiple widgets that share a library (let's say, hypothetically but highly discouraged, jQuery), you can add these libraries to `Libraries.js`. This way the libraries are shared instead added to the widgets seperately. |
| widget folder | Change `widget.filesFolder` in `package.json` | This corresponds to the `src/Widgetname/widget` folder. It is recommended **NOT** to change this. This also affects the widget ID, which is comprised of `<packageName>/<widgetFolder/<widgetName>`. Change at own risk |

## Using a test-project

Are you developing a widget and running this in a test-project? Add the folder path to `widget.path` in your `package.json`.

This will automatically detect changes, while running `yarn run dev`. Here's what it does:

Configuration in **package.json**:
```json
...
    package: "Widget",
    path: "/Volumes/C/Projects/MendixProjects/TestProject"
...
```

1. A change is detected in the `src` folder
2. Webpack is triggered and will build the widget to the `build` folder
3. Webpack will also create a *Widget.mpk* (the name is the same as the Package name (see above)) and put it in the `dist` folder.
4. Changes are detected in the `build` folder (because of 2). These files are copied to `<path>/deployment/web/widgets/<package>/`
5. Changes are detected in the `dist` folder (because of 3). These files are copied to `<path>/widgets/<package>.mpk`

## Styling

Styling is done through SCSS files. Please add a `.scss` file to your `Widget\widget` folder (or anywhere else, for that matter).
Import the file in your widget Javascript file:

```js
import 'Widget.scss'
```

This will create a CSS file in the `build\Widget\widget\ui` folder

### Styling development.

Styling a widget can be a bit problematic in Mendix. The reason for this is that the Modeler will bundle all CSS files in 1 single `widgets.css`.
When you are styling, you will have to redeploy everytime you make a change. Add the following to your widget Javascript file:

```js
// The following code will be stripped with our webpack loader and should only be used if you plan on doing styling
/* develblock:start */
import loadcss from 'loadcss';
loadcss(`/widgets/${packageName}/${widgetFolder}/ui/Widget.css`);
/* develblock:end */
```

Make sure it is between the `develblock` blocks. This code will be removed when running `yarn run build`, so it does not eventually show up in you widget code,

## Helpers

In this widget package is a series of helpers. Due to Webpack and treeshaking, the helpers that are not included in the widget, will not end up in the code of the packaged widget.
