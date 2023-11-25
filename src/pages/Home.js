import React from 'react'
import DefaultLayout from '../components/DefaultLayout';
import { useSelector } from 'react-redux';
import Post from '../components/Post';
import {Row, Col} from 'antd';

function Home() {

  const {users} = useSelector(state=>state.userReducer);
  const {posts} = useSelector(state=>state.postsReducer);

  return (
    <div>
      <DefaultLayout>
        <Row justify='center'>
          <Col lg={12} xs={24}>
            {posts.map(post=>{
              return <Post post={post}/>
            })}
          </Col>
        </Row>
      </DefaultLayout>
    </div>
  )
}

export default Home
