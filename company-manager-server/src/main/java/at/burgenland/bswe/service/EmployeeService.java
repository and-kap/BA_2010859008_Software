package at.burgenland.bswe.service;

import at.burgenland.bswe.persistence.base.IRepository;
import at.burgenland.bswe.persistence.entity.Employee;
import at.burgenland.bswe.persistence.repository.DepartmentRepository;
import at.burgenland.bswe.persistence.repository.EmployeeRepository;
import at.burgenland.bswe.service.base.SimpleService;
import at.burgenland.bswe.service.dto.DepartmentDto;
import at.burgenland.bswe.service.dto.EmployeeDto;
import at.burgenland.bswe.service.dto.PaginationDto;
import org.apache.naming.factory.ResourceEnvFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService extends SimpleService<EmployeeDto, Employee> {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    protected IRepository<Employee> repository() {
        return this.employeeRepository;
    }

    @Override
    public EmployeeDto get(Long id) {
        EmployeeDto dto = super.get(id);
        convertIdToObject(dto);
        return dto;
    }

    @Override
    public List<EmployeeDto> getAll() {
        List<EmployeeDto> dtos = super.getAll();

        dtos.forEach(this::convertIdToObject);
        return dtos;
    }

    @Override
    public PaginationDto<EmployeeDto> getAllWithPage(PageRequest pageRequest, String filter, String sortBy, String sortOrder) {
        PaginationDto<EmployeeDto> paginationDto = super.getAllWithPage(pageRequest, filter, sortBy, sortOrder);
        paginationDto.getItems().forEach(this::convertIdToObject);
        return paginationDto;
    }

    @Override
    public void delete(Long id) {
        List<Employee> references = this.employeeRepository.findAllByManagerId(id);
        System.out.println(references);
        references.forEach(reference -> {
            reference.setManagerId(null);
            System.out.println(mapEntityToDto(reference));
            this.update(mapEntityToDto(reference));
        });

        super.delete(id);
    }

    private void convertIdToObject(EmployeeDto dto) {
        if (dto.getDepartmentId() != null) {
            dto.setDepartment(map(departmentRepository.findById(dto.getDepartmentId()), DepartmentDto.class));
        }

        if (dto.getManagerId() != null) {
            dto.setManager(map(employeeRepository.findById(dto.getManagerId()), EmployeeDto.class));
        }
    }
}
