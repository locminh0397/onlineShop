import React, {useState} from "react"
import {Link} from 'react-router-dom'
import Layout from "../core/Layout"
import {signup} from '../auth/index'


const Signup = () => {
    const [values, setValues] = useState({
        name:'',
        email:'',
        passowrd:'',
        error: '',
        success: false
    }) 

    const { name, email, password, success, error } = values;

    

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password })
        .then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Tên hiển thị</label>
                <input onChange={ handleChange('name') } type="text" className="form-control" value={name}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={ handleChange('email') } type="email" className="form-control" value={email}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Mật khẩu</label>
                <input onChange={ handleChange('password') } type="password" className="form-control" value={password}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Đăng ký</button>
        </form>
    )
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Tạo tài khoản thành công! <Link to="/signin">Mời đăng nhập</Link>
        </div>
    );

    return (
        <Layout title="Đăng ký" description="Nhập thông tin đăng ký " className="container col-md-8 offset-md-2">
            {showError()}
            {showSuccess()}
            {signUpForm()}
        </Layout>
    )
}

export default Signup
