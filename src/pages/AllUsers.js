import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout';
import { Row, Col, Button, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { followUser, getAllUsers, unfollowUser } from '../redux/actions/userActions';


function AllUsers() {

    const { users } = useSelector((state) => state.userReducer);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const { followLoading, unfollowLoading } = useSelector((state) => state.alertsReducer);
    const [searchKey , setSearchKey] = useState('')
    const dispatch = useDispatch();


    useEffect(() => {

        dispatch(getAllUsers());

      }, [followLoading, unfollowLoading]);


    return (
        <DefaultLayout>
            <div>
                <Row>
                    <Col lg={24}>
                        <Input className='mt-3 all-user-search' placeholder='<search users/>' value={searchKey} onChange={(e) => {setSearchKey(e.target.value)}} />
                    </Col>
                </Row>
                <Row justify='center' gutter={16}>
                    {users.filter(obj=>obj.username.toLowerCase().includes(searchKey.toLowerCase())).map(user => {
                        return <>
                            {currentUser._id != user._id && (<Col lg={5} xs={24} className='' >
                                <div className='all-user-card'>
                                    {user.profilePicUrl == "" ? (
                                        <span className="profilepic1 d-flex align-items-center all-user-def-pfp">
                                            {user.username[0]}
                                        </span>
                                    ) : (<img src={user.profilePicUrl} className='pfp d-block my-1' height='60' width='60'/>
                                    )}
                                    <Link  to={`/profile/${user._id}`}>{user.username}</Link>
                                    <p>Since {moment(user.createdAt).format('MMM yyyy')}</p>
                                    {user.followers.find((obj) => obj == currentUser._id) ? (
                        <div className='d-flex'>
                           <Button disabled='true'>Following</Button>
                           <Button className='ml-2'  onClick={() => {
                            dispatch(
                              unfollowUser({
                                currentuserid: currentUser._id,
                                receiveruserid: user._id,
                              })
                            );
                          }}>UnFollow</Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => {
                            dispatch(
                              followUser({
                                currentuserid: currentUser._id,
                                receiveruserid: user._id,
                              })
                            );
                          }}
                        >
                          Follow
                        </Button>
                      )}
                                </div>
                            </Col>)}
                        </>;
                    })}

                </Row>

            </div>
        </DefaultLayout>
    )
}

export default AllUsers
