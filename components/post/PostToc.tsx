import React from 'react';
import styled, { css } from 'styled-components';
import useToc from '../../libs/hooks/post/useToc';

interface Props {
  html: string;
}

function PostToc({ html }: Props) {
  const { tocs, activeId } = useToc(html);

  return (
    <Cotainer>
      <Contents>
        <TocBox>
          {tocs.map((toc) => (
            <TocItem
              key={toc.text}
              active={activeId === toc.id}
              style={{ marginLeft: toc.level * 12 }}
            >
              <a href={`#${toc.id}`}>{toc.text}</a>
            </TocItem>
          ))}
        </TocBox>
      </Contents>
    </Cotainer>
  );
}

// Styles
const Cotainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 225px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  position: fixed;
  top: 56px;
  left: 75%;
  height: 100%;
`;

const Contents = styled.div`
  position: relative;
  margin-top: 2rem;
  width: 100%; ;
`;

const TocBox = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 2px solid #38d9a9;
  padding-left: 1rem;
`;

const TocItem = styled.div<{ active: boolean }>`
  font-size: 1rem;
  line-height: 2.2;
  transition: 0.2s all;

  a {
    &:hover {
      color: #20c997;
    }
    ${(props) =>
      props.active &&
      css`
        color: #38d9a9;
        transform: scale(1.2);
      `}
  }
`;

export default PostToc;
