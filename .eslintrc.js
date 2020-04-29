module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		'plugin:prettier/recommended',
		'eslint:recommended',
	],
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	rules: {
		'no-console': ['warn', { allow: ['warn', 'debug'] }],
		'no-warning-comments': [
			'warn',
			{ terms: ['todo', 'debug', 'fixme'], location: 'anywhere' },
		],
		'no-mixed-spaces-and-tabs': 'warn',
		'no-empty-pattern': 'warn',
		'no-unused-vars': 'warn',
	},
}
