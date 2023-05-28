/*
================================
    Author: Andreas Kappel
    Date: 19.12.2022
================================
*/

DROP TABLE IF EXISTS salgrade;
DROP TABLE IF EXISTS emp;
DROP TABLE IF EXISTS dept;

CREATE TABLE dept (
  id               INTEGER,
  name             TEXT,
  location         TEXT,
  CONSTRAINT pk_dept PRIMARY KEY (id)
);

create table emp (
  id             INTEGER,
  lastname       TEXT,
  job            TEXT,
  manager_id     INTEGER,
  hiredate       DATE,
  salary         INTEGER,
  commission     INTEGER,
  department_id  INTEGER,
  CONSTRAINT pk_emp PRIMARY KEY (id),
  CONSTRAINT fk_mgr FOREIGN KEY (manager_id) REFERENCES emp (id),
  CONSTRAINT fk_deptno FOREIGN KEY (department_id) REFERENCES dept (id)
);

CREATE TABLE salgrade (
  grade     INTEGER,
  low_sal   INTEGER,
  high_sal  INTEGER,
  CONSTRAINT pk_salgrade PRIMARY KEY (grade)
);

CREATE SEQUENCE dept_seq START WITH 50 INCREMENT BY 10;
CREATE SEQUENCE emp_seq START WITH 8000 INCREMENT BY 5;