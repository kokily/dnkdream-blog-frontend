import React, { useRef } from 'react';
import useUtterances from '../../libs/hooks/common/useUtterances';

function Comment() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useUtterances({
    url: 'https://utteranc.es/client.js',
    theme: 'github-light',
    issueTerm: 'url',
    repo: 'kokily/dnkdream',
    ref: containerRef,
  });

  return (
    <div>
      <div ref={containerRef} />
    </div>
  );
}

export default Comment;
