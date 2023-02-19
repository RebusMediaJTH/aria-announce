# aria-announce

Provides a simple method to make announcements to screen reader users.

-   Option to test your announcements by displaying them, in a black bar, at the top of the page.
-   Ordinarily, if you set the contents of an [aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) node with the same contents that are already present, an announcement will not be made. **aria-announce** ensures the announcement is repeated.

```js
if (correct) {
    announce("Correct! See below for the next question");
} else {
    announce("Not quite, try again");
}
```

<br>

## Installation

### 1. Via package installation

```cmd
npm install aria-announce
```

```js
import announce from "aria-announce";
import "/path/to/node_modules/aria-announce/dist/aria-announce.css";
```

### 2. Via file links

Download the code zip and extract `dist/aria-announce.js` and `dist/aria-announce.css`.

```html
<script type="text/javascript" src="/path/to/aria-announce.js"></script>
<link href="/path/to/aria-announce.css" rel="stylesheet" />
```

**Note:** when installed via file links, prefix the `announce` method with the namespace `dioada`.

<br>

## Initialize

### announce.init(options)

Append the announce node, specify whether testing or not, and specify the default options.

| Name       | Type      | Default  | Description                                                                                                                                                                                                                                |
| ---------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| appendTo   | `string`  | `"body"` | Where to append the announce node.                                                                                                                                                                                                         |
| test       | `boolean` | `false`  | If `true`, announcements are displayed, in a black bar, at the top of the page.<br />The black bar is removed when the announce node is emptied (see `clearAfter`, below). Click the bar to remove it early.                               |
| assertive  | `boolean` | `true`   | [MDN aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)<br>Overridable in the [announce](#usage) method.                                                                                        |
| atomic     | `boolean` | `true`   | [MDN aria-atomic](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-atomic)<br>Overridable in the [announce](#usage) method.                                                                                 |
| clearAfter | `number`  | `5`      | The number of seconds after which to empty the announce node. Emptying the node prevents confusion caused by a user navigating to a stale announcement.<br />Specify `-1` to never clear.<br>Overridable in the [announce](#usage) method. |

```js
window.addEventListener("DOMContentLoaded", () => {
    announce.init({test: myConfig.showAnnouncements && MY_IS_DEV_ENV_FLAG});
});
```

<br>

## Usage

### announce(text, options)

| Name    | Type     | Description                                                                       |
| ------- | -------- | --------------------------------------------------------------------------------- |
| text    | `string` | The text to announce.                                                             |
| options | `object` | Optionally override `assertive`, `atomic` and `clearAfter` for this announcement. |

```js
if (correct) {
    announce("Correct! See below for the next question");
} else {
    announce("Not quite, try again");
}
```
