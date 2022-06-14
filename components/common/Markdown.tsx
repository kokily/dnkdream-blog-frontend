import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import styled from 'styled-components';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-css.min.js';
import 'prismjs/components/prism-tsx.min.js';
import { media } from '../../styles';

interface Props {
  markdown: string;
}

function Markdown({ markdown }: Props) {
  const [html, setHtml] = useState('');

  const renderMarkdown = () => {
    if (!markdown) {
      setHtml('');
      return;
    }

    marked.setOptions({
      breaks: true,
    });

    let oldBody = markdown;
    let newFrontBody = oldBody.replaceAll(
      '<pre class="ql-syntax" spellcheck="false">',
      '<pre class="ql-syntax" spellcheck="false"><code class="language-jsx">'
    );
    let newBody = newFrontBody.replaceAll('</pre>', '</code></pre>');

    setHtml(marked.parse(newBody));
  };

  useEffect(() => {
    renderMarkdown();
  });

  useEffect(() => {
    return () => {
      Prism.highlightAll();
    };
  }, [html]);

  return <Container dangerouslySetInnerHTML={{ __html: html }} />;
}

// Styles
const Container = styled.div`
  line-height: 1.6;
  padding-left: 0.5rem;
  margin-bottom: 14rem;
  blockquote {
    border-left: 4px solid #1b3bf5;
    padding: 1rem;
    background: #a1a1a1;
    color: black;
    margin-left: 0;
    margin-right: 0;
    p {
      margin: 0;
    }
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.715rem;
  }
  h3 {
    font-size: 1.6rem;
  }
  h4 {
    font-size: 1.415rem;
  }
  h1,
  h2,
  h3,
  h4 {
    font-weight: bold;
    margin-top: 2rem;
    color: #4056b9;
  }
  pre {
    padding: 0.5rem;
    color: #ffffff;
    background: #4a4a4a;
    border-radius: 4px;
    overflow-x: auto;

    code {
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      overflow-wrap: normal;
      padding: 0.25rem;

      ${media.small} {
        font-size: 1rem;
      }
    }
  }

  a {
    color: #1b3bf5;
    &:hover {
      color: #2f4df8;
      text-decoration: underline;
    }
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  table,
  th,
  td {
    border: 1px solid #888888;
  }
  th,
  td {
    font-size: 0.9rem;
    padding: 0.25rem;
    text-align: left;
  }
  img,
  iframe {
    max-width: 100%;
    margin: 0 auto;
    display: block;
    margin-bottom: 2.3rem;
  }
  img {
    border-radius: 4px;
  }

  p {
    font-size: 1.2rem;
    em {
      color: #fff;
      background: #1fb498;
      padding: 0.1rem 0.5rem 0rem 0.5rem;
      font-style: normal;
      border-radius: 4px;
    }

    strong {
      color: #1e63c4;
      border-radius: 6px;
      padding-left: 0.4rem;
      padding-right: 0.4rem;
      margin-left: 0.2rem;
      margin-right: 0.2rem;
    }
  }
`;

export default Markdown;
