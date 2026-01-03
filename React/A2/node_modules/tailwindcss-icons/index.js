const glob = require('glob');
const path = require('path');
const fs = require('fs');
const plugin = require('tailwindcss/plugin');
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;

class IconBuilder {

	_prefix;
	_separator;
	_namespaceSeparator;

	/**
	 * @param {string|null} prefix
	 * @param {string} separator
	 * @param {string} namespaceSeparator
	 */
	constructor(prefix = null, separator = '-', namespaceSeparator = '--') {
		if (prefix && prefix.length && !prefix.endsWith(separator)) {
			prefix += separator;
		}

		this._prefix = prefix;
		this._separator = separator;
		this._namespaceSeparator = namespaceSeparator;
	}

	/**
	 * @param {string[]} names
	 * @param {string} color
	 * @return {string}
	 */
	build(names, color) {
		let name = '';

		if (this._prefix) {
			name += this._prefix;
		}

		name += names.join(this._namespaceSeparator) + this._separator;
		name += color;

		return name;
	}

	/**
	 * @param {string} contents
	 */
	buildCss(contents) {
		return {
			'background-image': `url("data:image/svg+xml;utf-8,${encodeURIComponent(contents)}")`,
		};
	}

}

function createIconBuilder(prefix = null, separator = '-', namespaceSeparator = '--') {
	return new IconBuilder(prefix, separator, namespaceSeparator);
}

function tailwindcssIcons(iconDir, required = false, iconBuilder = null) {
	iconBuilder = iconBuilder ? iconBuilder : new IconBuilder();

	return plugin(function ({ addUtilities, theme }) {
		const utilities = {};
		const files = glob(path.join(iconDir, '**/*.svg'), { sync: true });

		for (const file of files) {
			const contents = fs.readFileSync(file).toString();

			if (!contents.includes('%color%')) {
				if (required) {
					console.warn(`Icon file ${file} does not contain %color%`);
				}

				continue;
			}

			const relative = path.relative(iconDir, file);
			const names = relative.split('/').filter(str => str.length);
			const lastName = names[names.length - 1];
			names[names.length - 1] = lastName.substr(0, lastName.length - 4);

			for (const [colorName, color] of Object.entries(flattenColorPalette(theme('colors')))) {
				if (!color.startsWith('#')) {
					continue;
				}

				const icon = contents.replaceAll('%color%', color);

				utilities['.' + iconBuilder.build(names, colorName)] = iconBuilder.buildCss(icon);
			}
		}

		addUtilities(utilities);
	});
}

module.exports = {
	tailwindcssIcons,
	createIconBuilder,
};
