package at.burgenland.bswe.controller.base;

import at.burgenland.bswe.persistence.base.Identifiable;
import at.burgenland.bswe.service.base.IService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public abstract class ControllerBase<T extends Identifiable> {
    protected Logger logger = LoggerFactory.getLogger(this.getClass());

    protected abstract IService<T> service();

    @GetMapping
    public ResponseEntity<?> findAll(@RequestParam(required = false) String page,
                                     @RequestParam(required = false) String size,
                                     @RequestParam(required = false) String filter,
                                     @RequestParam(required = false) String sortBy,
                                     @RequestParam(required = false) String sortOrder) {
        logger.debug("findAll() called with params\npage = {}\nsize = {}", page, size);

        if (page != null && size != null) {
            PageRequest pageRequest = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
            return ResponseEntity.ok(service().getAllWithPage(pageRequest, filter, sortBy, sortOrder));
        }
        return ResponseEntity.ok(service().getAll());

    }

    @GetMapping("/{id}")
    public ResponseEntity<T> findById(@PathVariable Long id) {
        logger.debug("findById() called with id = {}", id);

        final T dto = service().get(id);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<T> create(@RequestBody T dto) {
        logger.debug("create() called");

        try {
            System.out.println(dto);
            return ResponseEntity.ok(service().create(dto));
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<T> updateById(@PathVariable Long id, @RequestBody T dto) {
        logger.debug("updateById() called with id = {}", id);

        dto.setId(id);
        T saved = service().update(dto);

        if (saved == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<T> deleteById(@PathVariable Long id) {
        logger.debug("deleteById() called with id = {}", id);

        service().delete(id);
        return ResponseEntity.noContent().build();
    }
}
