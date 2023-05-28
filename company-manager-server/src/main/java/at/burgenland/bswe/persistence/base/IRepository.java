package at.burgenland.bswe.persistence.base;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

@NoRepositoryBean
public interface IRepository<TEntity> extends CrudRepository<TEntity, Long>, JpaSpecificationExecutor<TEntity>, PagingAndSortingRepository<TEntity, Long> {
    List<TEntity> findAll();

    Optional<TEntity> findById(Long id);
}
