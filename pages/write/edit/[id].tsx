import type { NextPage } from 'next';
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

export default EditPage;
