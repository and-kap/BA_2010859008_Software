import React, {useEffect, useState} from 'react';
import useHttp from "../../hooks/use-http";
import {BASE_URL, PAGE, SIZE} from "../../config/AppConfig";
import {useNavigate} from "react-router-dom";

export function Departments() {
    const [departments, setDepartments] = useState();
    const {error: departmentsError, sendRequest: departmentsApi} = useHttp();
    const navigate = useNavigate();

    useEffect(() => {
        let params = `?page=${PAGE}&size=${SIZE}`;
        const applyDepartments = (departments) => {
            setDepartments(departments?.items);
        }
        departmentsApi({url: `${BASE_URL}/departments${params}`}, applyDepartments);
    }, []);

    return (
        <div className="container-fluid mt-4 container-scroll">
            <div className="row mt-2 mx-3 mb-3">
                <div className="col-8">
                    <h3>Departments</h3>
                </div>
                <div className="col-4">
                    <button type="button" className="btn btn-sm btn-success float-end" onClick={() => navigate('create')}>
                        <i className="bi bi-plus me-1"></i> Add
                    </button>
                </div>
            </div>

            <div className="row mx-3">
                {departments?.map(department => <div key={`department#${department.id}`} className="col-sm-12 col-md-4 mt-3" onClick={() => navigate(`${department.id}`)}>
                    <div className="card company-card">
                        <div className="card-body">
                            <div className="d-inline-flex w-100">
                                <h5 className="card-title me-auto">{department.name}</h5>
                                <i className="bi bi-person me-2"></i>{department.employees}
                            </div>
                            <h6 className="card-subtitle mb-2 text-muted">{department.location}</h6>
                            <div className="card-text">
                                <div className="row">
                                    <div className="col-6">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default Departments;