/** Shared chrome fills — border, background, and text from the palette / theme canvas. */
export type TChromeVariant = 'solid' | 'subtle' | 'surface' | 'outline';

/** Interactive controls: ghost adds hover fill; plain only shifts text color. */
export type TInteractiveMinimalVariant = 'ghost' | 'plain';

export type TInteractiveVariant = TChromeVariant | TInteractiveMinimalVariant;

/** Static display (no hover/focus chrome): plain only — not ghost. */
export type TStaticVariant = TChromeVariant | 'plain';
