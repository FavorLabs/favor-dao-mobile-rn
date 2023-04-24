import request from '../index';
import {
  CommentInfo,
  CommentRes,
  CreateComment,
  CreateCommentReplyRes,
  CreatePost,
  CreateReply,
  GetCommentsParams,
  ListData,
  Page,
  PostInfo,
  ResData,
  Status,
  ReTransferPost,
} from '../../declare/api/DAOApi';
export default {
  createPost(url: string, data: CreatePost): ResData<PostInfo> {
    return request({
      method: 'post',
      url: url + '/post',
      data,
    });
  },
  getPostListByType(url: string, params: Page): ResData<ListData<PostInfo>> {
    return request({
      url: url + '/posts',
      params,
    });
  },
  getPostListByDaoId(
    url: string,
    daoId: string,
    params: Page,
  ): ResData<ListData<PostInfo>> {
    return request({
      url: url + `/dao/posts?daoId=${daoId}`,
      params,
    });
  },
  getPostById(url: string, id: string): ResData<PostInfo> {
    return request({
      url: url + '/post',
      params: {
        id,
      },
    });
  },
  deletePost(url: string, id: string): ResData<Status> {
    return request({
      method: 'delete',
      url: url + `/post?id=${id}`,
    });
  },
  getFollow(url: string, params: Page): ResData<ListData<PostInfo>> {
    return request({
      method: 'get',
      url: url + `/posts/focus`,
      params,
    });
  },
  checkPostLike(url: string, id: string): ResData<Status> {
    return request({
      url: url + '/post/star',
      params: { id },
    });
  },
  postLike(url: string, id: string): ResData<Status> {
    return request({
      method: 'post',
      url: url + '/post/star',
      data: { id },
    });
  },
  addPostView(url: string, id: string): ResData<Status> {
    return request({
      method: 'post',
      url: url + '/post/view',
      params: { id },
    });
  },
  getPostComments(
    url: string,
    params: GetCommentsParams,
  ): ResData<ListData<CommentInfo>> {
    return request({
      url: url + '/post/comments',
      params,
    });
  },
  addPostComment(url: string, data: CreateComment): ResData<CommentRes> {
    return request({
      method: 'post',
      url: url + '/post/comment',
      data,
    });
  },
  deletePostComment(url: string, id: string): ResData<any> {
    return request({
      method: 'delete',
      url: url + '/post/comment',
      data: { id },
    });
  },
  addCommentReply(
    url: string,
    data: CreateReply,
  ): ResData<CreateCommentReplyRes> {
    return request({
      method: 'post',
      url: url + '/post/comment/reply',
      data,
    });
  },
  deleteCommentReply(url: string, id: string): ResData<any> {
    return request({
      method: 'delete',
      url: url + '/post/comment/reply',
      data: { id },
    });
  },
  reTransferPost(url: string, data: ReTransferPost): ResData<PostInfo> {
    return request({
      method: 'post',
      url: url + '/post',
      data,
    });
  },
};
