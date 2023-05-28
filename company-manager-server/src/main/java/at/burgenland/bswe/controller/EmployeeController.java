package at.burgenland.bswe.controller;

import at.burgenland.bswe.controller.base.ControllerBase;
import at.burgenland.bswe.service.EmployeeService;
import at.burgenland.bswe.service.base.IService;
import at.burgenland.bswe.service.dto.EmployeeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Controller
@CrossOrigin
@RequestMapping(path = "/employees")
public class EmployeeController extends ControllerBase<EmployeeDto> {

    @Autowired
    private EmployeeService employeeService;

    @Override
    protected IService<EmployeeDto> service() {
        return this.employeeService;
    }

    @PutMapping("/bulk")
    public ResponseEntity<List<EmployeeDto>> updateBulk(@RequestBody List<Long> ids) {
        logger.debug("updateBulk() called");

        if (ids != null && !ids.isEmpty()) {
            List<EmployeeDto> employees = new ArrayList<>();
            for (int i = 0; i < ids.size(); i++) {
                final var emp = new EmployeeDto();
                emp.setId((long) i + 1);
                this.updateEmployee(emp);
                employees.add(emp);
            }
            return ResponseEntity.ok(employees);
        }
        return ResponseEntity.ok(new ArrayList<>());
    }

    @PutMapping("/single/{id}")
    public ResponseEntity<EmployeeDto> updateSingleById(@PathVariable Long id) {
        logger.debug("updateSingleById() called with id = {}", id);
        if (id != null) {
            final var emp = new EmployeeDto();
            emp.setId(id);
            this.updateEmployee(emp);
            return ResponseEntity.ok(emp);
        }
        return ResponseEntity.ok(null);
    }

    private void updateEmployee(EmployeeDto dto) {
        dto.setLastname("Smith");
        dto.setJob("Programmer");
        dto.setHireDate(LocalDateTime.now().plusDays(321));
        dto.setSalary((long) 1234);
        dto.setCommission((long) 0);
        dto.setDepartment(null);
        dto.setManager(null);
    }
}
