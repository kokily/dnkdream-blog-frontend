import { createGlobalStyle, css } from 'styled-components';

const mediaQuery = (max_width: number) => `
  @media (max-width: ${max_width}px)
`;

export const media = {
  xxlarge: mediaQuery(2000),
  xlarge: mediaQuery(1500),
  large: mediaQuery(1200),
  medium: mediaQuery(992),
  small: mediaQuery(768),
  xsmall: mediaQuery(376),
};

// 그림자 효과: https://codepen.io/sdthornton/pen/wBZdXq 기반
export const shadow = (weight: number) => {
  const shadows = [
    css`
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    `,
    css`
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    `,
    css`
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    `,
    css`
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    `,
    css`
      box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
        0 15px 12px rgba(0, 0, 0, 0.22);
    `,
  ];

  return shadows[weight];
};

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: #4d4d4d;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
      background: #353535;
    }
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes slideUpFromBottom {
    0% {
      transform: translateY(70%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export default GlobalStyle;
