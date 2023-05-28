import React, {useEffect, useState} from 'react';
import {BASE_URL, PAGE, SIZE} from '../../config/AppConfig';
import useHttp from "../../hooks/use-http";
import {useNavigate} from "react-router-dom";
import {EmployeeCard} from "./employee-card/EmployeeCard";

// export class Employees extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             size: 1_000,
//             employees: [],
//             createdEmployees: []
//         }
//
//         // fetch(`${BASE_URL}/employees`).then(res => res.json()).then(res => this.setState({
//         //     ...this.state,
//         //     employees: res
//         // }))
//     }
//
//     componentDidMount() {
//         // initial rendering
//
//         // useEffect(() => {}, [])
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         //useEffect(() => {}, [props])
//         performance.mark('domManipulationEnd');
//         const mark = performance.getEntriesByName('domManipulationStart')[0];
//         if (mark) {
//             const measurement = performance.measure('domManipulation', 'domManipulationStart', 'domManipulationEnd');
//             // fetch('http://localhost:8081', {
//             //     method: 'POST',
//             //     body: JSON.stringify({
//             //         app: 'React',
//             //         browser: navigator.userAgent.indexOf("Chrome") !== -1 ? 'Chrome' : 'Firefox',
//             //         event: mark.detail,
//             //         size: this.state.size,
//             //         time: measurement.duration
//             //     })
//             // });
//             performance.clearMarks();
//             performance.clearMeasures();
//         }
//     }
//
//     changeSize = (event) => {
//         event.preventDefault()
//         this.setState({
//             ...this.state,
//             size: +event.target.value
//         })
//     }
//
//     doNothing = (event) => {
//         event.preventDefault();
//         event.target?.blur();
//     }
//
//     addEmployeeInternal = (event) => {
//         event && this.doNothing(event)
//         const employees = [];
//         performance.mark('domManipulationStart', {detail: 'domManipulation_ADD'});
//         for (let i = 0; i < this.state.size; i++) {
//             employees.push({
//                 id: i + 1,
//                 lastname: 'Doe',
//                 job: 'Tester',
//                 hireDate: new Date().toISOString(),
//                 department: null,
//                 manager: null,
//                 salary: 1234,
//                 commission: 0
//             });
//         }
//
//         this.setState({
//             ...this.state,
//             createdEmployees: [...employees]
//         })
//     }
//
//     updateEmployees = (event) => {
//         performance.mark('domManipulationStart', {detail: 'domManipulation_EDIT'});
//         const employees = this.state.createdEmployees.slice();
//
//         employees.forEach((emp, idx) => {
//             if (idx % 2 === 0) {
//                 emp.job = 'Test Manager';
//                 emp.salary = 2345;
//                 emp.hireDate = new Date(new Date().getMilliseconds() + 24 * 60 * 60 * 1000).toISOString();
//             }
//         });
//
//         this.setState({
//             ...this.state,
//             createdEmployees: employees
//         })
//     }
//
//     deleteEmployees = () => {
//         performance.mark('domManipulationStart', {detail: 'domManipulation_DELETE'});
//         for (let i = 0; i < this.state.size; i++) {
//             this.setState((oldState) => ({
//                 ...oldState,
//                 createdEmployees: oldState.createdEmployees.splice(0, oldState.createdEmployees.length - 1)
//             }));
//         }
//     }
//
//     sendBulkRequest = (event) => {
//         performance.mark('domManipulationStart', {detail: 'domManipulation_BULK_REQUEST'});
//         fetch(`${BASE_URL}/employees/bulk`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(new Array(this.state.size).fill(1).map((v, i) => v + i))
//         }).then(res => res.json()).then(res => this.setState({
//             ...this.state,
//             createdEmployees: res
//         }))
//     }
//
//     sendSingleRequests = (event) => {
//         performance.mark('domManipulationStart', {detail: 'domManipulation_SINGLE_REQUESTS'});
//
//         const promises = [];
//         const ids = new Array(this.state.size).fill(1).map((v, idx) => v + idx);
//         console.log(ids);
//         ids.forEach(id => {
//             promises.push(fetch(`${BASE_URL}/employees/single/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//             }).then(res => res.json()));
//         });
//
//         Promise.all(promises).then(results => {
//             this.setState({
//                 ...this.state,
//                 createdEmployees: results
//             });
//         });
//     }
//
//     render() {
//         return (
//             <div className="container-fluid mt-4 container-scroll">
//                 <div className="row mt-2 mx-3 mb-3">
//                     <div className="col-8">
//                         <h3>Employees</h3>
//                     </div>
//                     <div className="col-4">
//                         <button type="button" className="btn btn-sm btn-success float-end"
//                             // onClick={() => navigate('create')}
//                         >
//                             <i className="bi bi-plus me-1"></i> Add
//                         </button>
//                     </div>
//                 </div>
//
//                 <div className="row mt-2 mx-3 my-2">
//                     <div className="col-12 text-end">
//                         <div className="d-inline-flex justify-content-center">
//                             <input id="dom_size" type="number" className="form-control me-2 float-end"
//                                    style={{'maxWidth': '200px !important'}} value={this.state.size}
//                                    onChange={this.changeSize}/>
//                             <button id="dom_add" type="button" className="btn btn-sm btn-warning float-end mx-2"
//                                     onClick={this.addEmployeeInternal}>
//                                 DOM_ADD
//                             </button>
//                             <button id="dom_edit" type="button" className="btn btn-sm btn-warning float-end mx-2"
//                                     onClick={this.updateEmployees}>
//                                 DOM_EDIT
//                             </button>
//                             <button id="dom_delete" type="button" className="btn btn-sm btn-warning float-end mx-2"
//                                     onClick={this.deleteEmployees}>
//                                 DOM_DELETE
//                             </button>
//                             <button id="api_bulk" type="button" className="btn btn-sm btn-primary float-end mx-2"
//                                     onClick={this.sendBulkRequest}>
//                                 API_BULK
//                             </button>
//                             <button id="api_single" type="button" className="btn btn-sm btn-primary float-end ms-2"
//                                     onClick={this.sendSingleRequests}>
//                                 API_SINGLE
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//
//                 <div className="row mx-3">
//                     {this.state.employees && this.state.employees.map(employee => <div key={`employee#${employee.id}`}
//                                                                                        className="col-sm-12 col-md-6 col-lg-4 mt-3">
//                         <EmployeeCard props={employee}/>
//                     </div>) || <span>No employees found!</span>}
//                 </div>
//
//                 <div className="row mx-3" style={{height: '200px'}}>
//                     {this.state.createdEmployees?.map(employee => <div key={`employee#${employee.id}`}
//                                                                        className="col-sm-12 col-md-6 col-lg-4 mt-3">
//                         <EmployeeCard props={employee}/>
//                     </div>)}
//                 </div>
//             </div>
//         );
//     }
// }

export function Employees() {
    const [employees, setEmployees] = useState([]);
    const [createdEmployees, setCreatedEmployees] = useState([]);
    const [size, setSize] = useState(1_000);
    const {error: employeesError, sendRequest: employeesApi} = useHttp();
    const navigate = useNavigate();

    useEffect(() => {
        let params = `?page=${PAGE}&size=${SIZE}`;
        const applyEmployees = (employees) => {
            setEmployees(employees?.items);
        }
        employeesApi({url: `${BASE_URL}/employees${params}`}, applyEmployees);
    }, []);

    useEffect(() => {
        performance.mark('domManipulationEnd');
        const mark = performance.getEntriesByName('domManipulationStart')[0];
        if (mark) {
            const measurement = performance.measure('domManipulation', 'domManipulationStart', 'domManipulationEnd');
            fetch('http://localhost:8081', {
                method: 'POST',
                body: JSON.stringify({
                    app: 'React',
                    browser: navigator.userAgent.indexOf("Chrome") !== -1 ? 'Chrome' : 'Firefox',
                    event: mark.detail,
                    size: size,
                    time: measurement.duration
                })
            });
            performance.clearMarks();
            performance.clearMeasures();
        }
    }, [createdEmployees]);

    const doNothing = (event) => {
        event.preventDefault();
        event.target?.blur();
    }

    const changeSize = (event) => {
        event.preventDefault()
        setSize(event.target.value);
    }

    const addEmployees = (event) => {
        event && doNothing(event)
        const employees = [];
        performance.mark('domManipulationStart', {detail: 'domManipulation_ADD'});
        for (let i = 0; i < size; i++) {
            employees.push({
                id: i + 1,
                lastname: 'Doe',
                job: 'Tester',
                hireDate: new Date().toISOString(),
                department: null,
                manager: null,
                salary: 1234,
                commission: 0
            });
        }

        setCreatedEmployees([...employees]);
    }
    const updateEmployees = () => {
        performance.mark('domManipulationStart', {detail: 'domManipulation_EDIT'});
        const employees = createdEmployees.slice();

        employees.forEach((emp, idx) => {
            if (idx % 2 === 0) {
                emp.job = 'Test Manager';
                emp.salary = 2345;
                emp.hireDate = new Date(new Date().getMilliseconds() + 24 * 60 * 60 * 1000).toISOString();
            }
        });

        setCreatedEmployees([...employees]);
    }
    const deleteEmployees = () => {
        performance.mark('domManipulationStart', {detail: 'domManipulation_DELETE'});
        for (let i = 0; i < size; i++) {
            setCreatedEmployees(oldState => oldState.splice(0, oldState.length - 1));
        }
    }
    const sendBulkRequest = () => {
        performance.mark('domManipulationStart', {detail: 'domManipulation_BULK_REQUEST'});
        fetch(`${BASE_URL}/employees/bulk`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new Array(size).fill(1).map((v, i) => v + i))
        }).then(res => res.json()).then(res => setCreatedEmployees(res))
    }
    const sendSingleRequests = () => {
        performance.mark('domManipulationStart', {detail: 'domManipulation_SINGLE_REQUESTS'});

        const promises = [];
        const ids = new Array(+size).fill(1).map((v, idx) => v + idx);
        ids.forEach(id => {
            promises.push(fetch(`${BASE_URL}/employees/single/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json()));
        });

        Promise.all(promises).then(results => {
            setCreatedEmployees(results);
        });
    }

    return (
        <div className="container-fluid mt-4 container-scroll">
            <div className="row mt-2 mx-3 mb-3">
                <div className="col-8">
                    <h3>Employees</h3>
                </div>
                <div className="col-4">
                    <button type="button" className="btn btn-sm btn-success float-end"
                        // onClick={() => navigate('create')}
                    >
                        <i className="bi bi-plus me-1"></i> Add
                    </button>
                </div>
            </div>

            <div className="row mt-2 mx-3 my-2">
                <div className="col-12 text-end">
                    <div className="d-inline-flex justify-content-center">
                        <input id="dom_size" type="number" className="form-control me-2 float-end"
                               style={{'maxWidth': '200px !important'}} value={size}
                               onChange={changeSize}/>
                        <button id="dom_add" type="button" className="btn btn-sm btn-warning float-end mx-2"
                                onClick={addEmployees}>
                            DOM_ADD
                        </button>
                        <button id="dom_edit" type="button" className="btn btn-sm btn-warning float-end mx-2"
                                onClick={updateEmployees}>
                            DOM_EDIT
                        </button>
                        <button id="dom_delete" type="button" className="btn btn-sm btn-warning float-end mx-2"
                                onClick={deleteEmployees}>
                            DOM_DELETE
                        </button>
                        <button id="api_bulk" type="button" className="btn btn-sm btn-primary float-end mx-2"
                                onClick={sendBulkRequest}>
                            API_BULK
                        </button>
                        <button id="api_single" type="button" className="btn btn-sm btn-primary float-end ms-2"
                                onClick={sendSingleRequests}>
                            API_SINGLE
                        </button>
                    </div>
                </div>
            </div>

            <div className="row mx-3">
                {employees && employees.map(employee => <div key={`employee#${employee.id}`}
                                                                                   className="col-sm-12 col-md-6 col-lg-4 mt-3">
                    <EmployeeCard props={employee}/>
                </div>) || <span>No employees found!</span>}
            </div>

            <div className="row mx-3" style={{height: '200px'}}>
                {createdEmployees?.map(employee => <div key={`employee#${employee.id}`}
                                                                   className="col-sm-12 col-md-6 col-lg-4 mt-3">
                    <EmployeeCard props={employee}/>
                </div>)}
            </div>
        </div>
    );
}

export default Employees;