import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import {BASE_URL} from "../../../config/AppConfig";

export function DepartmentDetail() {
    const params = useParams();
    const navigate = useNavigate();

    const editMode = params.id !== 'create';
    const header = 'Department Detail';

    const [formData, setFormData] = useState({name: "", location: ""});
    const [department, setDepartment] = useState(undefined);
    const [modify, setModify] = useState(undefined);
    const {error: departmentError, sendRequest: departmentApi} = useHttp();

    useEffect(() => {
        if (editMode) {
            const applyDepartment = (data) => {
                setDepartment(data);
                setFormData(data);
            }
            departmentApi({url: `${BASE_URL}/departments/${params.id}`}, applyDepartment)
        }
    }, []);
    useEffect(() => {
        if (modify?.event === 'delete') {
            const afterDelete = () => navigate('/departments');
            departmentApi({
                url: `${BASE_URL}/departments/${params.id}`,
                method: 'DELETE'
            }, afterDelete);
        }
    }, [modify]);
    useEffect(() => {
        if (modify?.event === 'save') {
            if (editMode) {
                departmentApi({
                    url: `${BASE_URL}/departments/${params.id}`,
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: formData
                }, () => {
                    navigate('/departments')
                });
            } else {
                departmentApi({
                    url: `${BASE_URL}/departments`,
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: formData
                }, () => {
                    navigate('/departments')
                });
            }
        }
    }, [modify]);

    const inputChangeHandler = (event) => {
        const {id, value} = event.target;
        setFormData({...formData, [id]: value})
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        setModify({event: 'save'});
    }
    const onDeleteHandler = () => setModify({event: 'delete'});
    const disabled = () => Object.keys(formData).some(key => formData[key] === null || formData[key] === "");

    return (
        <div className="container-fluid">
            <div className="row my-2">
                <div className="col-sm-12 col-md-9 d-md-inline-flex">
                    <h3 className="me-md-auto">{header}
                        {editMode && <React.Fragment>
                            <span> for</span>
                            <span className="highlight-blue"> {department?.name}</span>
                        </React.Fragment>}
                    </h3>
                    <button className="btn btn-sm btn-danger" style={{height: 'fit-content'}}
                            onClick={onDeleteHandler}>
                        <i className="bi bi-trash me-1"></i>Delete
                    </button>
                </div>
            </div>

            <form onSubmit={onSubmitHandler}>
                <div className="form-group row mt-2 align-items-center">
                    <label htmlFor="name" className="col-md-3 col-sm-12">Name *</label>
                    <div className="col-md-6 col-sm-12">
                        <input id="name" type="text" className="form-control"
                               defaultValue={formData?.name}
                               onChange={(e) => inputChangeHandler(e)}/>
                    </div>
                </div>
                <div className="form-group row mt-2 align-items-center">
                    <label htmlFor="location" className="col-md-3 col-sm-12">Location *</label>
                    <div className="col-md-6 col-sm-12">
                        <input id="location" type="text" className="form-control"
                               defaultValue={formData?.location}
                               onChange={(e) => inputChangeHandler(e)}/>
                    </div>
                </div>


                <div className="row mt-3">
                    <div className="col-md-9 col-sm-12 text-end">
                        <NavLink to={'/departments'}>
                            <button type="button" className="btn btn-sm btn-secondary me-2">Cancel</button>
                        </NavLink>
                        <button type="submit" disabled={disabled()} className="btn btn-sm btn-success">Save</button>
                    </div>
                </div>
            </form>
        </div>
    )


}

export default DepartmentDetail;