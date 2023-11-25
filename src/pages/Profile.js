import React, { useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Row, Col, Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import Post from '../components/Post';


function Profile({ match }) {
  const { users } = useSelector((state) => state.userReducer);
  const { posts } = useSelector((state) => state.postsReducer);
  const params = useParams();
  const user = users.find((obj) => obj._id == params.userid);
  const usersposts = posts.filter((obj) => obj.user._id == params.userid);
  const currentuser = JSON.parse(localStorage.getItem("user"));

  const [followersModalDisplay, setfollowersModalDisplay] = useState(false);
  const [followingModalDisplay, setfollowingModalDisplay] = useState(false);


  return (
    <DefaultLayout>
      {users.length > 0 && (
        <>
          <Row justify='center'>
            <Col lg={12} sm={24} xs={24}>
              <div className='m-5 profile'>
                <div className='d-flex align-items-center'>
                  {user.profilePicUrl == "" ? (
                    <p className="profile-pic">{user.username[0]}</p>
                  ) : (
                    <img src={user.profilePicUrl} height='100' width='100' className='img-curve mx-5' />
                  )}
                  <div className="text-left profile-info">
                    <p style={{ color: "black" }} id='profile-name'>{user.username}</p>
                    <p style={{ fontSize: 15 }} id='profile-date'>
                      {moment(user.createdAt).format("MMM DD yyyy")}
                    </p>

                    {currentuser._id == user._id && (
                      <Button>
                        <Link to="/editprofile" id='profile-button'>Edit profile</Link>
                      </Button>
                    )}
                  </div>
                </div>
                <p className='my-2'> Bio : {user.bio.length == 0 ? 'frontend developer' : user.bio}</p>
                <Button className='mx-2' onClick={()=>{setfollowersModalDisplay(true)}}>Followers: {user.followers.length}</Button>
                <Button className='mx-2' onClick={()=>{setfollowingModalDisplay(true)}}>Following: {user.following.length}</Button>
                <p className='my-2'>Total posts : {usersposts.length}</p>
              </div>
            </Col>
          </Row>

          {(user.followers.find(obj => obj == currentuser._id) || user.privateAccount == false || user._id == currentuser._id) ?
            (<Row justify='center' gutter={16}>
              {usersposts.map(post => {
                return (
                  <Col lg={8} sm={24} xs={24}>
                    <Post post={post} postInProfilePage={true} />
                  </Col>
                )
              })}
            </Row>):(<p> This account is private. Follow to see posts.</p>)}

            
            <Modal
            title="Followers"
            open={followersModalDisplay}
            closable={false}
            onCancel={() => {
              setfollowersModalDisplay(false);
            }}
            onOk={()=>{
              setfollowersModalDisplay(false);
            }}
          >
            {user.followers.map((obj) => {
              const followeruser = users.find((o) => o._id == obj);

              return (
                <div className="d-flex align-items-center p-1 mt-2">
                  {followeruser.profilePicUrl == "" ? (
                    <span className="profilepic1 d-flex align-items-center">
                      {followeruser.username[0]}
                    </span>
                  ) : (
                    <img
                      src={followeruser.profilePicUrl}
                      height="35"
                      width="35"
                      style={{ borderRadius: "50%" }}
                    />
                  )}

                  <div className='ml-2'>
                      <div style={{ margin : 2}}><Link style={{textDecoration: 'none'}}>{followeruser.username}</Link></div>
                      <div style={{ margin : 2}}>Since {moment(followeruser.createdAt).format('MMM DD yyyy')}</div>
                  </div>
                </div>
              );
            })}
          </Modal>
       
          
          <Modal
            title="Following"
            open={followingModalDisplay}
            closable={false}
            onCancel={() => {
              setfollowingModalDisplay(false);
            }}
            onOk={()=>{
              setfollowingModalDisplay(false);
            }}
          >
            {user.following.map((obj) => {
              const followinguser = users.find((o) => o._id == obj);

              return (
                <div className="d-flex align-items-center p-1 m-2">
                  {followinguser.profilePicUrl == "" ? (
                    <span className="profilepic1 d-flex align-items-center">
                      {followinguser.username[0]}
                    </span>
                  ) : (
                    <img
                      src={followinguser.profilePicUrl}
                      height="35"
                      width="35"
                      style={{ borderRadius: "50%" }}
                    />
                  )}

                  <div className='ml-2'>
                      <div style={{ margin : 2}}><Link style={{textDecoration: 'none'}}>{followinguser.username}</Link></div>
                      <div style={{ margin : 2}}>Since {moment(followinguser.createdAt).format('MMM DD yyyy')}</div>
                  </div>
                </div>
              );
            })}
          </Modal>



        </>)}
    </DefaultLayout>
  )
}

export default Profile
