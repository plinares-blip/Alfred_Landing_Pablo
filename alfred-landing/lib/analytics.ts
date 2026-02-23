/**
 * Analytics utilities for form tracking
 */

// Get UTM parameters from URL
export function getUTMParams(): Record<string, string> {
    if (typeof window === 'undefined') return {};

    const params = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};

    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
        const value = params.get(key);
        if (value) utmParams[key] = value;
    });

    return utmParams;
}

// Track form start event
export function trackFormStart(formName: string): void {
    if (typeof window === 'undefined') return;

    // Google Analytics 4
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'form_start', {
            form_name: formName,
        });
    }

    console.log(`[Analytics] Form started: ${formName}`);
}

// Track form submission
export function trackFormSubmit(formName: string, metadata?: Record<string, string>): void {
    if (typeof window === 'undefined') return;

    // Google Analytics 4
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'form_submit', {
            form_name: formName,
            ...metadata,
        });
    }

    console.log(`[Analytics] Form submitted: ${formName}`, metadata);
}

// Extend Window interface for gtag
declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}
