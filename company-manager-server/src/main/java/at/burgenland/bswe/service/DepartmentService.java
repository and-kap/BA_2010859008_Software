package at.burgenland.bswe.service;

import at.burgenland.bswe.persistence.entity.Employee;
import at.burgenland.bswe.persistence.repository.DepartmentRepository;
import at.burgenland.bswe.persistence.base.IRepository;
import at.burgenland.bswe.persistence.entity.Department;
import at.burgenland.bswe.persistence.repository.EmployeeRepository;
import at.burgenland.bswe.service.base.SimpleService;
import at.burgenland.bswe.service.dto.DepartmentDto;
import at.burgenland.bswe.service.dto.PaginationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DepartmentService extends SimpleService<DepartmentDto, Department> {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeService employeeService;

    @Override
    protected IRepository<Department> repository() {
        return this.departmentRepository;
    }

    public Object findAllWithEmployees(PageRequest pageRequest, String filter, String sortBy, String sortOrder) {
        PaginationDto<DepartmentDto> paginationDto = null;
        List<DepartmentDto> dtos = null;
        if (pageRequest != null) {
            paginationDto = this.getAllWithPage(pageRequest, filter, sortBy, sortOrder);
            dtos = paginationDto.getItems();
        } else {
            dtos = this.getAll();
        }

        this.setNumberOfEmployees(dtos);

        return paginationDto != null ? paginationDto : dtos;
    }

    @Override
    public void delete(Long id) {
        List<Employee> references = this.employeeRepository.findAllByDepartmentId(id);
        references.forEach(reference -> {
            reference.setDepartmentId(null);
            this.employeeService.update(this.employeeService.mapEntityToDto(reference));
        });
        super.delete(id);
    }

    private void setNumberOfEmployees(List<DepartmentDto> dtos) {
        if (dtos != null) {
            dtos.stream().forEach(dto -> {
                dto.setEmployees(this.employeeRepository.countEmployeeByDepartmentIdEquals(dto.getId()));
            });
        }
    }
}
