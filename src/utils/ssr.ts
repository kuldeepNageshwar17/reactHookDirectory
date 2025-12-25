// SSR helpers: guard usage of window/document in server environments
export const isClient = typeof window !== 'undefined' && typeof window.document !== 'undefined'

// Return window when available (undefined in SSR). Use to avoid direct `window` access.
export function getWindow(): Window | undefined {
	return isClient ? window : undefined
}
