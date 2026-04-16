/**
 * Analytics utilities for GA4 and Google Ads tracking
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

/**
 * Generic event tracker for GA4
 * @param eventName Name of the event to track
 * @param eventParams Additional parameters for the event
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, {
            ...eventParams,
            // Include UTM context by default if available
            ...getUTMParams(),
        });
        
        // Debugging log (only in development)
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics Event] ${eventName}`, eventParams);
        }
    }
};

// Track form start event (Refactored to use trackEvent)
export function trackFormStart(formName: string, additionalParams?: Record<string, any>): void {
    trackEvent('form_start', {
        form_name: formName,
        ...additionalParams,
    });
}

// Track form submission (Refactored to use trackEvent)
export function trackFormSubmit(formName: string, metadata?: Record<string, any>): void {
    trackEvent('form_submit', {
        form_name: formName,
        ...metadata,
    });
}

// Extend Window interface for gtag
declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}
