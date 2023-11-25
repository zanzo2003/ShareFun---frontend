import React, { useState }from 'react'
import DefaultLayout from '../components/DefaultLayout';
import { Row, Col, Form, Input, Select, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { editUser } from '../redux/actions/userActions';
import { Link } from 'react-router-dom';

function Editprofile() {
    const user = JSON.parse(localStorage.getItem('user'))
    const [profilePicUrl , setProfilePicUrl] = useState(user.profilePicUrl);
    const dispatch = useDispatch();
    
    function handleFileInput(e) {

        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader(file);
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setProfilePicUrl(reader.result);
          }
        }
      }
      function edit(values){
        values.profilePicUrl = profilePicUrl;
        values._id = user._id;
        console.log(values);
        dispatch(editUser(values))
      }

    return (
        <DefaultLayout>
            <Row justify='center'>
                <Col>
                    <div className='profile mt-5 p-3'>
                        <h3>Edit Profile</h3>
                        <Form layout='vertical' initialValues={user} onFinish={edit}>
                            <Form.Item name='username' label='Username'>
                                <Input />
                            </Form.Item>
                            <Form.Item name='bio' label='Bio'>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Profile Pic' name='profilePicUrl'>
                                <div className='d-flex align-items-center'>
                                    {profilePicUrl == "" ? (
                                        <p className="profile-pic mx-5" style={{width: '80px', height: '60px', boxShadow: 'none'}}>{user.username[0]}</p>
                                    ) : (
                                        <img src={profilePicUrl} height="80" width="80" style={{borderRadius: '50%'}} />
                                    )}
                                    <Input type='file' onChange={handleFileInput}/>
                                </div>
                            </Form.Item>
                            <Form.Item name='privateAccount'>
                                <Select>
                                    <Select.Option value={true}>Private</Select.Option>
                                    <Select.Option value={false}>Public</Select.Option>
                                </Select>

                            </Form.Item>
                            <Button htmlType='submit' className='mx-2'>Edit</Button>
                            <Button><Link to='/' style={{textDecoration: 'none'}}>Cancel</Link></Button>

                        </Form>
                    </div>
                </Col>
            </Row>
        </DefaultLayout>
    )
}

export default Editprofile;

