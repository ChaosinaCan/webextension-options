import { useMemo } from 'react';
import { browser } from 'webextension-polyfill-ts';
import plural from '@spadin/webextension-plural';

/**
 * Gets a localized message using i18n.getMessage().
 *
 * @param message The name of the message to localize.
 * @param substitutions Parameters to substitute into the message.
 */
export function useMessage(message: string, ...substitutions: readonly any[]) {
    return useMemo(() => {
        return browser.i18n.getMessage(message, substitutions);
    }, [substitutions]);
}

export interface PluralOptions {
    /**
     * A string or list of strings to insert into the message.
     * If omitted, `value` is passed as the only substitution parameter.
     */
    substitutions?: any | readonly any[];

    /**
     * Set to `true` to use cardinal forms (1st, 2nd, 3rd, ...) instead of
     * ordinal forms (1, 2, 3, ...).
     */
    ordinal?: boolean;

    /**
     * A string separating the plural forms in the message string. Defaults to
     * `|` if omitted.
     */
    separator?: string;
}

/**
 * Gets a variant of a localized message based on the plural form of a given number.
 *
 * See [webextension-plural](https://github.com/ChaosinaCan/webextension-plural)
 * for more details.
 *
 * @param message A message in messages.json containing a list of
 * @param value A number to determine which plural form to use.
 * @param options Optional configuration.
 */
export function usePlural(message: string, value: number | string, options?: PluralOptions) {
    return useMemo(() => {
        return plural(message, value, options);
    }, [message, value, options]);
}
