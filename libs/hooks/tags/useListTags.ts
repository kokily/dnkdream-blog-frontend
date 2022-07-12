import { useQuery } from 'react-query';
import { listTagsAPI } from '../../api/tags';

function useListTags() {
  const { data: tags } = useQuery('listTags', () => listTagsAPI(), {
    enabled: true,
  });

  return {
    tags,
  };
}

export default useListTags;
