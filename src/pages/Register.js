import React from 'react'
import { Row, Col, Form, Input } from 'antd';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { userRegister } from '../redux/actions/userActions';

function Register() {

    const dispatch = useDispatch();

    function register(values) {
        console.log(values);
        delete values.cpassword ;
        
        dispatch(userRegister(values));
    }



    return (
        <div>

            <Row justify={'center'} className='register-div'>
                <Col lg={10} xs={24}>
                    <Form layout='vertical' className='bs1' onFinish={register}>
                        <h3 className='heading-log-reg'>Register</h3>

                        <Form.Item label="Username" name='username' rules={[{ required: true }]}>
                            <Input placeholder='enter your username' className='input-field' />
                        </Form.Item>
                        <Form.Item label="Password" name='password' rules={[{ required: true }]}>
                            <Input placeholder='enter your password' type='password' className='input-field' />
                        </Form.Item>
                        <Form.Item label="Confirm Password" name='cpassword' rules={[{ required: true }]}>
                            <Input placeholder='confirm your password' type='password' className='input-field' />
                        </Form.Item>

                        <button htmltype='submit' className='pushable'><span className='front'>Register</span></button>

                        <div className="text-right">
                            <Link to="/login"> Already registered? Click here to Login.</Link>
                        </div>

                    </Form>
                </Col>

            </Row>
        </div>
    )
}

export default Register;
