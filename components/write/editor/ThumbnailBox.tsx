import React from 'react';
import styled from 'styled-components';

interface Props {
  thumbnail: string;
  onUploadImage: (isThumbnail: boolean) => void;
}

function ThumbnailBox({ thumbnail, onUploadImage }: Props) {
  return (
    <Container>
      {thumbnail ? (
        <>
          <h3>썸네일 ⚑</h3>
          <ImageBox src={thumbnail} alt="Thumbnail" />
        </>
      ) : (
        <UploadButton onClick={() => onUploadImage(true)}>
          썸네일을 등록하세요
        </UploadButton>
      )}
    </Container>
  );
}

// Styles
const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  margin-bottom: 2.2rem;

  h3 {
    margin-left: 1rem;
    color: #0e3cc4;
  }
`;

const ImageBox = styled.img`
  width: 100%;
  max-width: 650px;
  height: auto;
  filter: sepia(40%);
  border: 1px solid white;
  border-radius: 4px;
  padding: 5px;
`;

const UploadButton = styled.span`
  width: 100%;
  border: 1px solid #179ecb;
  border-radius: 15px;
  padding: 6px 10px 5px 10px;
  background: #179ecb;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
  transition: 0.2s all;
  &:hover {
    color: #179ecb;
    background-color: #fff;
  }
`;

export default ThumbnailBox;
