package at.burgenland.bswe.service.base;

import at.burgenland.bswe.service.dto.PaginationDto;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface IService<T> {
    List<T> getAll();

    PaginationDto getAllWithPage(PageRequest pageRequest, String filter, String sortBy, String sortOrder);

    T get(Long id);

    T create(T dto);

    T update( T dto);

    void delete(Long id);
}
