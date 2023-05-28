import classes from "../Employees.module.css";
import dayjs from "dayjs";
import React from "react";
import {useNavigate} from "react-router-dom";

export function EmployeeCard({props}) {
    const navigate = useNavigate();


    return <div className="card company-card" onClick={() => navigate(`${props.id}`)}>
        <div className="card-body">
            <div className="d-inline-flex w-100">
                <h5 className="card-title me-auto">{props?.lastname}</h5>
                {props?.department && <span
                    className={`badge text-bg-primary ${classes['dept-badge']}`}>{props.department.name}</span>}
                {!props?.department && <span
                    className={`badge text-bg-danger ${classes['dept-badge']}`}>no department</span>}
            </div>

            <h6 className="card-subtitle mb-2 text-muted">{props?.job}</h6>
            <div className="card-text">
                <div className="row">
                    <div className="col-6">
                        <i className="bi bi-calendar me-2"></i>{dayjs(props.hireDate).format('DD.MM.YYYY')}
                    </div>

                    <div className="col-6 text-end">
                        <i className="bi bi-cash me-2"></i>
                        <span>{props.salary?.toFixed(2)} €</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 ">
                        <i className="bi bi-person me-2"></i>{props.manager?.lastname || '-'}
                    </div>
                    {props.commission > 0 && <div className="col-6 text-end">
                        <i className="bi bi-piggy-bank-fill me-2"></i>
                        <span>{props.commission?.toFixed(2)} €</span>
                    </div>}
                </div>
            </div>
        </div>
    </div>
}