import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface Props {
  thumbnail: string;
  onUploadImage: (isThumbnail: boolean) => void;
}

function ThumbnailBox({ thumbnail, onUploadImage }: Props) {
  return (
    <Container>
      {thumbnail ? (
        <>
          <Content>
            <h3>썸네일 ⚑</h3>
            <UploadButton onClick={() => onUploadImage(true)}>
              수정
            </UploadButton>
          </Content>
          <ImageBox>
            <Image src={thumbnail} alt="Thumbnail" width={650} height={450} />
          </ImageBox>
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
    margin-right: 1rem;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const ImageBox = styled.div`
  width: 100%;
  max-width: 650px;
  height: auto;
  border: 1px solid white;
  border-radius: 4px;
  padding: 5px;

  img {
    filter: sepia(40%);
  }
`;

const UploadButton = styled.span`
  width: 100%;
  height: 100%;
  max-width: 200px;
  border: 1px solid #179ecb;
  border-radius: 15px;
  padding: 6px 10px 5px 10px;
  background: #179ecb;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
  transition: 0.2s all;
  text-align: center;
  &:hover {
    color: #179ecb;
    background-color: #fff;
  }
`;

export default ThumbnailBox;
