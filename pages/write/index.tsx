import type { NextPage } from 'next';
import useLoggedIn from '../../libs/hooks/auth/useLoggedIn';
import PageTemplate from '../../components/common/PageTemplate';
import Write from '../../components/write/Write';
import useWrite from '../../libs/hooks/write/useWrite';

const WritePage: NextPage = () => {
  useLoggedIn(true);
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
  } = useWrite();

  return (
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
      />
    </PageTemplate>
  );
};

export default WritePage;
