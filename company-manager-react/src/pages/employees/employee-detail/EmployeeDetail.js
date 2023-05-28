import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import {BASE_URL} from "../../../config/AppConfig";

export function EmployeeDetail() {
    const params = useParams();
    const navigate = useNavigate();

    const editMode = params.id !== 'create';
    const header = 'Employee Detail';

    const [formData, setFormData] = useState({
        lastname: "",
        job: "",
        manager: null,
        hireDate: "",
        salary: 0,
        commission: null,
        department: null
    });
    const [employee, setEmployee] = useState(undefined);
    const [departments, setDepartments] = useState([]);
    const [managers, setManagers] = useState([]);
    const [modify, setModify] = useState(undefined);
    const {error: employeeError, sendRequest: employeeApi} = useHttp();
    const {error: departmentError, sendRequest: departmentApi} = useHttp();

    useEffect(() => {
        if (editMode) {
            const applyEmployee = (data) => {
                setEmployee(data);
                setFormData({...data, hireDate: data.hireDate?.split('T')[0]});
            }
            employeeApi({url: `${BASE_URL}/employees/${params.id}`}, applyEmployee)
        }
    }, []);
    useEffect(() => {
        if (modify?.event === 'delete') {
            const afterDelete = () => navigate('/employees');
            employeeApi({
                url: `${BASE_URL}/employees/${params.id}`,
                method: 'DELETE'
            }, afterDelete);
        }
    }, [modify]);
    useEffect(() => {
        if (modify?.event === 'save') {
            const body = {
                ...formData,
                hireDate: new Date(formData.hireDate).toISOString(),
                managerId: formData.manager,
                departmentId: formData.department
            };
            delete body.manager;
            delete body.department;

            if (editMode) {
                employeeApi({
                    url: `${BASE_URL}/employees/${params.id}`,
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: body
                }, () => {
                    navigate('/employees')
                });
            } else {
                employeeApi({
                    url: `${BASE_URL}/employees`,
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: body
                }, () => {
                    navigate('/employees')
                });
            }
        }
    }, [modify]);
    useEffect(() => {
        const applyDepartments = (data) => {
            setDepartments(data);
        }
        departmentApi({url: `${BASE_URL}/departments`}, applyDepartments)
    }, [editMode]);
    useEffect(() => {
        const applyManagers = (data) => setManagers(data);
        employeeApi({url: `${BASE_URL}/employees`}, applyManagers)
    }, [editMode])

    const inputChangeHandler = (event) => {
        const {id, value} = event.target;
        setFormData({...formData, [id]: value})
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        setModify({event: 'save'});
    }
    const onDeleteHandler = () => setModify({event: 'delete'});

    const disabled = () => Object.keys(formData).filter(key => key !== 'commission').some(key => formData[key] === null || formData[key] === "");

    return (
        <div className="container-fluid">
            <div className="row my-2">
                <div className="col-sm-12 col-md-9 d-md-inline-flex">
                    <h3 className="me-md-auto">{header}
                        {editMode && <React.Fragment>
                            <span> for</span>
                            <span className="highlight-blue"> {employee?.lastname}</span>
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
                    <label htmlFor="lastname" className="col-md-3 col-sm-12">Lastname *</label>
                    <div className="col-md-6 col-sm-12">
                        <input id="lastname" type="text" className="form-control" placeholder={'Lastname'}
                               defaultValue={formData?.lastname}
                               onChange={(e) => inputChangeHandler(e)}/>
                    </div>
                </div>
                <div className="form-group row mt-2 align-items-center">
                    <label htmlFor="job" className="col-md-3 col-sm-12">Job *</label>
                    <div className="col-md-6 col-sm-12">
                        <input id="job" type="text" className="form-control" placeholder={'Job'}
                               defaultValue={formData?.job}
                               onChange={(e) => inputChangeHandler(e)}/>
                    </div>
                </div>

                <div className="form-group row mt-2 align-items-center">
                    <label htmlFor="manager" className="col-md-3 col-sm-12">Manager *</label>
                    <div className="col-md-6 col-sm-12">

                        <select id='manager' className={'form-control'} value={formData.manager?.id} onChange={(e) => inputChangeHandler(e)}>
                            {managers?.map(manager => <option key={manager.id}
                                                              defaultValue={manager.id}>{manager.lastname} ({manager.job})</option>)}
                            <option key={'unselected:mgr'} value={null}>Please select...</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row mt-2 align-items-center">
                    <label htmlFor="hireDate" className="col-md-3 col-sm-12">Hiredate *</label>
                    <div className="col-md-6 col-sm-12">
                        <input id="hireDate" type="date" className="form-control" placeholder={'Hiredate'}
                               defaultValue={formData?.hireDate}
                               onChange={(e) => inputChangeHandler(e)}/>
                    </div>
                </div>

                <div className="form-group row mt-2 align-items-center">
                    <label htmlFor="salary" className="col-md-3 col-sm-12">Salary *</label>
                    <div className="col-md-6 col-sm-12">
                        <input id="salary" type="number" className="form-control" placeholder={'Salary'}
                               defaultValue={formData?.salary}
                               onChange={(e) => inputChangeHandler(e)}/>
                    </div>
                </div>

                <div className="form-group row mt-2 align-items-center">
                    <label htmlFor="commission" className="col-md-3 col-sm-12">Commission</label>
                    <div className="col-md-6 col-sm-12">
                        <input id="commission" type="number" className="form-control" placeholder={'Commission'}
                               defaultValue={formData?.commission}
                               onChange={(e) => inputChangeHandler(e)}/>
                    </div>
                </div>

                <div className="form-group row mt-2 align-items-center">
                    <label htmlFor="department" className="col-md-3 col-sm-12">Department *</label>
                    <div className="col-md-6 col-sm-12">

                        <select id='department' className={'form-control'} value={formData.department?.id} onChange={(e) => inputChangeHandler(e)}>
                            {departments?.map(dept => <option key={dept.id}
                                                              defaultValue={dept.id}>{dept.name}</option>)}
                            <option key={'unselected_dept'} value={null}>Please select...</option>
                        </select>
                    </div>
                </div>


                <div className="row mt-3">
                    <div className="col-md-9 col-sm-12 text-end">
                        <NavLink to={'/employees'}>
                            <button type="button" className="btn btn-sm btn-secondary me-2">Cancel</button>
                        </NavLink>
                        <button type="submit" disabled={disabled()} className="btn btn-sm btn-success">Save</button>
                    </div>
                </div>
            </form>
        </div>

    )


}

export default EmployeeDetail;