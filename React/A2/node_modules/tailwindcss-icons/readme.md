## Svg icons utilities for tailwindcss

Usage:

```js
const { tailwindcssIcons, createIconBuilder } = require('tailwindcss-icons');

module.exports = {
	plugins: [
		tailwindcssIcons(path.join(__dirname, 'icons'), true, createIconBuilder('icon')),
	]
};
```

Add placeholder %color% to svg icon in icons/example.svg
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12.001" viewBox="0 0 12 12.001">
	<path fill="%color%" fill-rule="evenodd" d="M340.293 148.293a1 1 0 0 1 1.414 0l4.293 4.293 4.293-4.293a1 1 0 0 1 1.414 1.414L347.414 154l4.293 4.293a1 1 0 0 1-1.414 1.414L346 155.414l-4.293 4.293a1 1 0 0 1-1.414-1.414l4.293-4.293-4.293-4.293a1 1 0 0 1 0-1.414z" transform="translate(-340 -148)"/>
</svg>
```

Pattern for html: %prefix%-%name%-%color%

Usage in html for icon in icons/example.svg
```html
<span class="icon-example-black"></span>
<span class="icon-example-white"></span>
```

Usage in html for icon in icons/brands/fb.svg
```html
<span class="icon-brands--fb-white"></span>
<span class="icon-brands--fb-black"></span>
```

Known issues:
- When added new icon, restart builder
