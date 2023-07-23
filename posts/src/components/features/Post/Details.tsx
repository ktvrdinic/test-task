// PostDetail.js
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
 getPostComments,
 getPostDetails,
} from '../../../services/post/Details';
import LoggerHOC from '../../../utils/LoggerHOC';
import { FIFE_MINUTES_IN_MILLISECONDS } from '../../../utils/constants';
import '../../../styles/post/Details.scss';

const PostDetail = () => {
 const { id } = useParams();

 if (!id) return <div>We don't have Id</div>;

 const {
  data: details,
  isLoading,
  isError,
 } = useQuery(['post', id], async () => await getPostDetails(id), {
  staleTime: FIFE_MINUTES_IN_MILLISECONDS,
 });

 const {
  data: comments,
  isLoading: isLoadingComments,
  isError: isErrorComments,
 } = useQuery(['comments', id], async () => await getPostComments(id), {
  staleTime: FIFE_MINUTES_IN_MILLISECONDS,
 });

 if (isError || isErrorComments) return <div>Error happened</div>;

 return (
  <LoggerHOC componentName={PostDetail.name} message='Hello from'>
   <div className='post-detail'>
    {isLoading ? (
     <div className='post-detail__loading'>Is loading...</div>
    ) : (
     <>
      <div className='post-detail__title'>{details?.title}</div>
      <div className='post-detail__body'>{details?.body}</div>

      <div className='post-detail__comment-title'>Comments:</div>
      <div className='post-detail__comment-list'>
       {isLoadingComments ? (
        <div className='post-detail__loading'>Comments loading...</div>
       ) : (
        comments?.map((comment) => (
         <div key={comment.id} className='post-detail__comment-item'>
          <div className='post-detail__comment-item-title'>{comment.title}</div>
          <div className='post-detail__comment-item-body'>{comment.body}</div>
         </div>
        ))
       )}
      </div>
     </>
    )}
   </div>
  </LoggerHOC>
 );
};

export default PostDetail;
