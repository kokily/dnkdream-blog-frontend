declare global {
  interface Window {
    gtag: (parma1: string, param2: string, param3: object) => void;
  }
}

export function pageView(url: URL) {
  window.gtag('config', process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID!, {
    page_path: url,
  });
}
