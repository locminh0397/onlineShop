import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getCategory, updateCategory } from './apiAdmin';
// {category: ["5cd0258f2793ec6e100bc191"], price: []}
// http://localhost:3000/admin/category/update/5cd0258f2793ec6e100bc191
const UpdateCategory = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        error: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();

    const { name, error, redirectToProfile } = values;

    const init = categoryId => {
        getCategory(categoryId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name
                });
            }
        });
    };

    useEffect(() => {
        init(match.params.categoryId);
    }, []);

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const submitCategoryForm = e => {
        e.preventDefault();
        const category = {
            name: name
        };
        updateCategory(match.params.categoryId, user._id, token, category).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    error: false,
                    redirectToProfile: true
                });
            }
        });
    };

    const updateCategoryForm = () => (
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            <form className="mb-5" onSubmit={submitCategoryForm}>
                <h1 className="login100-form-title p-b-32 m-b-7">Sửa danh mục sản phẩm</h1>
                <h3 className=" font-weight-bold mt-5 mb-3">Tên danh mục</h3> 
                <div className="">
                    <input
                        onChange={handleChange('name')}
                        value={name}
                        className="input100"
                        type="text"
                        required
                        name="name"
                    />
                </div>
                <div className="w-size25">
                    <button type="submit" className="btn btn-primary mt-3">
                        Thay đổi
                    </button>
                </div>
            </form>
        </div>
    );

    const showError = () => (
        <div className={'alert alert-danger'} role="alert" style={{ display: error ? '' : 'none' }}>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            {error}
        </div>
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/category" />;
            }
        }
    };

    const goBackBTN = () => {
        return (
            <div className="mt-5">
                    <Link to="/admin/dashboard" className="btn btn-warning mb-5">
                Quay lại
            </Link>
            </div>
        );
    };

    return (
        <Layout
            title={`Hi ${user.name}`}
            description={`This is Update Product Action Page`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2 m-b-250 mb-5">
                    {/* {showError()} */}
                    {updateCategoryForm()}
                    {goBackBTN()}
                    {redirectUser()}
                </div>
            </div>
        </Layout>
    );
};

export default UpdateCategory;