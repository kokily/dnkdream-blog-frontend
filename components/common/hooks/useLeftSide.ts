import { useQuery } from 'react-query';
import { listCategoriesAPI } from '../../../libs/api/posts';

function useLeftSide() {
  const { data } = useQuery('categories', () => listCategoriesAPI(), {
    enabled: true,
  });

  return {
    categories: data,
  };
}

export default useLeftSide;
