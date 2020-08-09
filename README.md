![](https://badgen.net/badge/@Editorjs-Callout/v2.0/blue) [![](https://data.jsdelivr.com/v1/package/npm/@itech-indrustries/editorjs-callout/badge)](https://www.jsdelivr.com/package/npm/@itech-indrustries/editorjs-callout)

# Code Tool for Editor.js

Code Tool for the [Editor.js](https://ifmo.su/editor) allows to include code examples in your articles.

![Screenshot from 2020-08-10 02-32-50](https://user-images.githubusercontent.com/55910733/89741787-e092b900-dab1-11ea-8597-1a21ec397410.png)

## Installation

### Install via NPM

Get the package

```shell
npm i @itech-indrustries/editorjs-callout
```

Include module at your application

```javascript
const CodeTool = require('@itech-indrustries/editorjs-callout');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@itech-indrustries/editorjs-callout).

`https://cdn.jsdelivr.net/npm/@editorjs/editorjs-callout@1.0.0`

Require this script on a page with Editor.js.

```html
<script src="https://cdn.jsdelivr.net/npm/@itech-indrustries/editorjs-callout@latest"></script>
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...
  
  tools: {
    ...
    code: CalloutTool,
  }
  
  ...
});
```

## Config Params

| Field       | Type     | Description                    |
| ----------- | -------- | -------------------------------|
| placeholder | `string` | Code Tool's placeholder string |

## Output data

This Tool returns code.

```json
{
    "type" : "callout",
    "data" : {
        "code": "body {\n font-size: 14px;\n line-height: 16px;\n}",
    }
}
```

