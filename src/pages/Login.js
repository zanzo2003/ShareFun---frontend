import React from 'react'
import {Row, Col, Form, Input,} from 'antd';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { userLogin } from '../redux/actions/userActions';

function Login() {
    const dispatch = useDispatch()

    function login(values){
        console.log(values);
        dispatch(userLogin(values));
    }




  return (
    <div>
    
        <Row justify={'center'} className='register-div'>
            <Col lg={10} xs={24}>
                <Form layout='vertical' className='bs1' onFinish={login}> 
                <h3 className='heading-log-reg'>Login</h3>

                    <Form.Item label="Username" name='username' rules={[{required: true}]}>
                        <Input placeholder='enter your username' className='input-field'/>
                    </Form.Item>
                    <Form.Item label="Password" name='password' rules={[{required: true}]}>
                        <Input placeholder='enter your password' type='password' className='input-field'/>
                    </Form.Item>

                    <button htmltype='submit' className='pushable'><span className='front'>Login</span></button>


                    <div className="text-right">
                    <Link to="/register"> Don't have an account? Click here to register.</Link>
                    </div>


                </Form>
            </Col>

        </Row>
    </div>
  )
}

export default Login;
