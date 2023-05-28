package at.burgenland.bswe.controller;

import at.burgenland.bswe.controller.base.ControllerBase;
import at.burgenland.bswe.service.DepartmentService;
import at.burgenland.bswe.service.base.IService;
import at.burgenland.bswe.service.dto.DepartmentDto;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


@Controller
@CrossOrigin
@RequestMapping(path = "/departments")
public class DepartmentController extends ControllerBase<DepartmentDto> {
    @Autowired
    public DepartmentService departmentService;

    @Override
    protected IService<DepartmentDto> service() {
        return this.departmentService;
    }

    @Override
    public ResponseEntity<?> findAll(@RequestParam(required = false) String page,
                                     @RequestParam(required = false) String size,
                                     @RequestParam(required = false) String filter,
                                     @RequestParam(required = false) String sortBy,
                                     @RequestParam(required = false) String sortOrder) {
        PageRequest pageRequest = null;

        if (page != null && size != null) {
            pageRequest = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
        }
        return ResponseEntity.ok(this.departmentService.findAllWithEmployees(
                pageRequest, filter, sortBy, sortOrder
        ));
    }
}