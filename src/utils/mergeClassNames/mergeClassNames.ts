/**
 * Merges multiple classnames into a single string.
 * Falsy values (undefined, null, "") are ignored.
 *
 * @example
 * mergeClassNames(styles.tag, className)
 * mergeClassNames(styles.btn, isActive && styles.active)
 */
export const mergeClassNames = (...classes: (string | undefined | null | false)[]): string =>
    classes.filter(Boolean).join(" ");
