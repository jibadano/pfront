/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss'
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import secondaryColor from '@material-ui/core/colors/amber'
import error from '@material-ui/core/colors/red'

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
	typography: {
		useNextVariants: true
	},
	palette: {
		primary: {
			main: '#222'
		},
		secondary: secondaryColor,
		error
	},
	overrides: {
		MuiAvatar: {
			root: {
				WebkitClipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
				clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
				borderRadius: 0,
				height: 45,
				width: 45
			}
		},
		MuiButton: {
			contained: {
				boxShadow: 'none'
			},
			fab: {
				boxShadow: 'none'
			}
		}
	},
	shape: {
		borderRadius: 2
	}
})

function createPageContext() {
	return {
		theme,
		// This is needed in order to deduplicate the injection of CSS in the page.
		sheetsManager: new Map(),
		// This is needed in order to inject the critical CSS.
		sheetsRegistry: new SheetsRegistry(),
		// The standard class name generator.
		generateClassName: createGenerateClassName()
	}
}

export default function getPageContext() {
	// Make sure to create a new context for every server-side request so that data
	// isn't shared between connections (which would be bad).
	if (!process.browser) {
		return createPageContext()
	}

	// Reuse context on the client-side.
	if (!global.__INIT_MATERIAL_UI__) {
		global.__INIT_MATERIAL_UI__ = createPageContext()
	}

	return global.__INIT_MATERIAL_UI__
}
