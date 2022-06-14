import type { NextPage } from 'next';
import Head from 'next/head';
import useLoggedIn from '../../../libs/hooks/auth/useLoggedIn';
import PageTemplate from '../../../components/common/PageTemplate';
import useWrite from '../../../libs/hooks/write/useWrite';
import Write from '../../../components/write/Write';

const EditPage: NextPage = () => {
  useLoggedIn();
  const {
    category,
    title,
    thumbnail,
    body,
    tags,
    onChangeCategory,
    onChangeTitle,
    onChangeBody,
    onChangeTags,
    onBack,
    onWrite,
    onUploadImage,
  } = useWrite(true);

  return (
    <>
      <Head>
        <title>포스트 수정 중 - D&K Dreams Blog</title>
      </Head>
      <PageTemplate left={false} right={false}>
        <Write
          category={category}
          title={title}
          thumbnail={thumbnail}
          body={body}
          tags={tags}
          onChangeCategory={onChangeCategory}
          onChangeTitle={onChangeTitle}
          onChangeBody={onChangeBody}
          onChangeTags={onChangeTags}
          onBack={onBack}
          onWrite={onWrite}
          onUploadImage={onUploadImage}
          isEdit={true}
        />
      </PageTemplate>
    </>
  );
};

export default EditPage;
