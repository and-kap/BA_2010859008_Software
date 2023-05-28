package at.burgenland.bswe.persistence.repository;

import at.burgenland.bswe.persistence.base.IRepository;
import at.burgenland.bswe.persistence.entity.Employee;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends IRepository<Employee> {

    public Long countEmployeeByDepartmentIdEquals(Long departmentId);

    public List<Employee> findAllByManagerId(Long id);
    public List<Employee> findAllByDepartmentId(Long id);
}

