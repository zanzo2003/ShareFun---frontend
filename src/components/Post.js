import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import { HeartFilled, CommentOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { addComment, getAllPosts, likeOrUnlikePost, editPost, deletePost } from '../redux/actions/postActions';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Row, Col, Input } from 'antd';
const { TextArea } = Input;



function Post({ post, postInProfilePage }) {

  const dispatch = useDispatch();
  const currentuser = JSON.parse(localStorage.getItem("user"));
  const alreadyLiked = post.likes.find(
    (obj) => obj.user.toString() == currentuser._id);

  const { likeOrUnlikeLoading, addCommentLoading, editPostLoading, deletePostLoading } = useSelector(
    (state) => state.alertsReducer
  );

  useEffect(() => {
    dispatch(getAllPosts());
  }, [likeOrUnlikeLoading, addCommentLoading, editPostLoading, deletePostLoading]);

  const [commentModalVisibility, setCommentModalVisibility] = useState(false);
  const [comment, setComment] = useState("");
  const { users } = useSelector((state) => state.userReducer);
  const [description, setdescription] = useState(post.description);
  const [editModalVisibility, setEditModalVisibility] = useState(false);


  return (
    <div className='post-frame'>
      <div className="d-flex post-header">
        <div className="d-flex">
          {post.user.profilePicUrl == "" ? (<span className="profilepic1 d-flex align-items-center">{post.user.username[0]}</span>) : (<img src={post.user.profilePicUrl} className='pfp' />)}
          <Link className='ml-2 post-username'>{post.user.username}</Link>
        </div>
        <div>
          <p className='post-date'>{moment(post.createdAt).format('MMM DD YYYY h:mm A')}</p>
        </div>
      </div>
      <img src={post.image} alt="post image" className={postInProfilePage ? 'postinprofile' : 'postimage'} />
      <p className='post-description'>Caption : {post.description}</p>

      <div className={postInProfilePage ? 'd-flex align-items-center justify-content-between' : 'd-flex align-items-center'}>
        <div className='mx-1'>
          <HeartFilled style={{ color: alreadyLiked ? "red" : "rgb(161, 161, 161)" }} onClick={() => { dispatch(likeOrUnlikePost({ postid: post._id })) }} />
          <p>{post.likes.length}</p>
        </div>
        <div className='mx-1'>
          <CommentOutlined onClick={() => setCommentModalVisibility(true)} />
          <p>{post.comments.length}</p>
        </div>

        {(post.user._id == currentuser._id && postInProfilePage == true) && (<>
          <div className='del-btn' onClick={()=>{
             dispatch(deletePost({_id : post._id}))
           }}>
            <DeleteOutlined />
          </div>
          <div className='ed-btn'>
            <EditOutlined  onClick={()=>{setEditModalVisibility(true)}}/>
          </div>
        </>)}

      </div>

      <Modal open={commentModalVisibility} title='Comments' closable={false} width={900}
        okText='Add comment'
        onCancel={() => setCommentModalVisibility(false)}
        onOk={() => {
          dispatch(addComment({ postid: post._id, comment: comment }))
          setCommentModalVisibility(false);
        }}
      >
        <Row>
          <Col lg={13} xs={0}>
            <img src={post.image} alt="post image" height="300" width="450" className='comment-image' />
          </Col>
          <Col lg={11} xs={24}>
            <TextArea className='comment-textbox' value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder='Add your comment' />

            {post.comments.map((comment) => {
              const user = users.find((obj) => obj._id == comment.user);

              return (
                <div className="d-flex align-items-center m-1 p-1 justify-content-between">
                  <div className='d-flex align-items-center '>
                    {user.profilePicUrl == "" ? (
                      <span className="profilepic1 d-flex align-items-center">
                        {user.username[0]}
                      </span>
                    ) : (
                      <img src={post.user.profilePicUrl} height='30' width='35' style={{ borderRadius: '50%' }} />
                    )}
                    <Link className='ml-1 cmt-user-name'>{user.username}</Link>
                    <p className='cmt'>{comment.comment}</p>
                  </div>
                  <div className='text-right d-flex'>
                    <p style={{ fontSize: 7 }} className='text-right cmt-date'>{comment.date}</p>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </Modal>

      <Modal title="Edit description" closable={false}
          onOk={() => {
            dispatch(editPost({ _id: post._id, description: description }))
            setEditModalVisibility(false)
          }}
          okText='edit' open={editModalVisibility} onCancel={() => { setEditModalVisibility(false) }}>

          <Input value={description} onChange={(e) => { setdescription(e.target.value) }} />

        </Modal>

    </div>
  )
}

export default Post;
