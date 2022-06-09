import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

interface Params {
  url: string;
  theme: 'github-light' | 'github-dark';
  issueTerm: string;
  repo: string;
  ref: RefObject<HTMLDivElement>;
}

function useUtterances(params: Params) {
  const { url, theme, issueTerm, repo, ref } = params;
  const [status, setStatus] = useState(url ? 'loading' : 'idle');

  useEffect(() => {
    if (!url) {
      setStatus('idle');
      return;
    }

    let script = document.createElement('script');

    script.src = url;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('theme', theme);
    script.setAttribute('issue-term', issueTerm);
    script.setAttribute('repo', repo);

    if (ref.current) {
      ref.current.appendChild(script);

      const setAttributeStatus = (e: any) => {
        setStatus(e.type === 'load' ? 'ready' : 'error');
      };

      script.addEventListener('load', setAttributeStatus);
      script.addEventListener('error', setAttributeStatus);

      return () => {
        if (script) {
          script.removeEventListener('load', setAttributeStatus);
          script.removeEventListener('error', setAttributeStatus);
        }
      };
    }
  }, [url]);

  return status;
}

export default useUtterances;
