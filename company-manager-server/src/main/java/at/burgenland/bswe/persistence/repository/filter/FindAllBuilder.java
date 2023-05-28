package at.burgenland.bswe.persistence.repository.filter;

import at.burgenland.bswe.service.dto.PaginationDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

public class FindAllBuilder<T, R extends PagingAndSortingRepository<T, ?> & JpaSpecificationExecutor<T>> {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private final R repository;

    private Specification<T> filters;

    private Sort sort = Sort.unsorted();

    public static <T, R extends PagingAndSortingRepository<T, ?> & JpaSpecificationExecutor<T>> FindAllBuilder<T, R> usingRepository(R repository) {
        return new FindAllBuilder<>(repository);
    }

    private FindAllBuilder(R repository) {
        this.repository = repository;
    }

    public Page<T> findAll(int page, int size) {
        return this.repository.findAll(filters, PageRequest.of(page, size, sort));
    }

    public FindAllBuilder<T, R> filterBy(List<String> filterList) {
        Optional<Specification<T>> optionalFilters = EntitySpecificationBuilder.parse(filterList);

        if (optionalFilters.isPresent()) {
            if (this.filters == null) {
                this.filters = Specification.where(optionalFilters.get());
            } else {
                this.filters = this.filters.and(optionalFilters.get());
            }
        }

        return this;
    }

    public FindAllBuilder<T, R> sortBy(String sortOrder, String sortBy) {
        logger.debug("sortBy = {} and sortOrder = {}", sortBy, sortOrder);
        if (sortOrder != null && !sortBy.isEmpty()) {
            this.sort = Sort.by(Sort.Direction.fromOptionalString(sortOrder).orElse(Sort.Direction.ASC), sortBy);
        }
        return this;
    }
}
