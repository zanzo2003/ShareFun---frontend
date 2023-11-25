import React, { useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Row, Col, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/actions/postActions';

const { TextArea } = Input;
function Addpost() {

  const [image, setimage] = useState('');
  const dispatch = useDispatch();

  function handleFileInput(e) {

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader(file);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setimage(reader.result);
      }
    }
  }

  function AddPost(values){
    values.image = image;
    dispatch(addPost(values));
  }

  return (
    <div>
      <DefaultLayout>

        <Row justify='center'>

          <Col lg={12}>

            <Form className='bs1 p-3 mt-5' layout='vertical' onFinish={AddPost}>
              <h3>Add new post</h3>

              <Form.Item name='description' label='Description' rules={[{ required: true }]}>
                <TextArea className='input-field' />
              </Form.Item>

              <Form.Item name='image' label='Image' rules={[{ required: true }]}>
                <Input type='file' onChange={handleFileInput} />
              </Form.Item>

              <div className='text-center'>
              {image !== '' && (<img src={image} height='200' width='300'/>)}
              </div>
          
              <br />

              <button htmltype='submit' className='pushable'><span className='front'>Post</span></button>

            </Form>

          </Col>

        </Row>

      </DefaultLayout>
    </div>
  )
}

export default Addpost;
