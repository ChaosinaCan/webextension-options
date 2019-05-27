import { detect } from 'detect-browser';

export type BrowserStyle = 'chrome' | 'edge' | 'firefox' | 'opera';

declare function require(module: string): any;

/**
 * Apply a stylesheet that matches the look of a browser's options pages.
 *
 * @param browser Style the options page like this browser. Omit to detect the browser automatically.
 */
export function applyStyle(browser?: BrowserStyle) {
    let style: string | null;
    if (browser) {
        style = browser;
    } else {
        const auto = detect();
        style = auto && auto.name;
    }

    switch (style) {
    // TODO: make these styles.
    //     case 'chrome':
    //         require('style-loader!css-loader!./styles/chrome/options.css');
    //         break;

    //     case 'edge':
    //         require('style-loader!css-loader!./styles/edge/options.css');
    //         break;

    //     case 'firefox':
    //         require('style-loader!css-loader!./styles/firefox/options.css');
    //         break;

    case 'opera':
        require('style-loader!css-loader!./styles/opera/options.css');
        break;
    }
}
