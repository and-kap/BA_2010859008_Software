package at.burgenland.bswe.service.base;

import at.burgenland.bswe.persistence.base.BaseModel;
import at.burgenland.bswe.persistence.base.IRepository;
import at.burgenland.bswe.persistence.repository.filter.FindAllBuilder;
import at.burgenland.bswe.service.dto.BaseDto;
import at.burgenland.bswe.service.dto.PaginationDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.GenericTypeResolver;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

public abstract class SimpleService<TDto extends BaseDto, TEntity extends BaseModel> extends ServiceBase<TDto, TEntity> implements IMapper<TDto, TEntity> {
    protected Logger logger = LoggerFactory.getLogger(this.getClass());

    protected final Class<TDto> genericDtoType;
    protected final Class<TEntity> genericEntityType;

    public SimpleService() {
        final Class<?>[] classes = GenericTypeResolver.resolveTypeArguments(getClass(), SimpleService.class);
        this.genericDtoType = (Class<TDto>) classes[0];
        this.genericEntityType = (Class<TEntity>) classes[1];
    }

    protected abstract IRepository<TEntity> repository();

    @Override
    public List<TDto> getAll() {
        logger.debug("getAll() called");

        List<TEntity> entities = repository().findAll();
        List<TDto> response = new ArrayList<>();

        if (entities != null) {
            for (TEntity entity : entities) {
                response.add(this.map(entity, genericDtoType));
            }
        }
        return response;
    }

    @Override
    public PaginationDto<TDto> getAllWithPage(PageRequest pageRequest, String filter, String sortBy, String sortOrder) {
        List<String> filterList = new ArrayList<>();

        if (filter != null) {
            Collections.addAll(filterList, filter.split("&"));
        }
        PaginationDto<TDto> dto = new PaginationDto<TDto>();
        dto.setPage(pageRequest.getPageNumber());

        Page<TEntity> entities = FindAllBuilder.usingRepository(repository()).filterBy(filterList)
                .sortBy(sortOrder, sortBy).findAll(pageRequest.getPageNumber(), pageRequest.getPageSize());
        dto.setTotal(entities.getTotalElements());
        dto.setPageCount((long) Math.ceil((float) entities.getTotalElements() / (float) pageRequest.getPageSize()));
        TDto genDto = null;
        dto.setItems(new ArrayList<>());
        for(TEntity entity : entities) {
            genDto = map(entity, genericDtoType);
            dto.getItems().add(genDto);
        }
        dto.setSize(entities.getContent().size());
        return dto;
    }

    @Override
    public TDto get(Long id) {
        logger.debug("get() called with id = {}", id);

        TEntity entity = repository().findById(id).orElseGet(null);
        TDto dto = null;
        if (entity != null) {
            dto = mapEntityToDto(entity);
        }
        return dto;
    }

    @Override
    public TDto create(TDto dto) {
        logger.debug("create() called with dto = {}", dto.toString());

        TEntity entity = this.mapDtoToEntity(dto);
        System.out.println("DTO: " + dto);
        System.out.println("Entity: " + entity);
        return this.mapEntityToDto(repository().save(entity));
    }

    @Override
    public TDto update(TDto dto) {
        logger.debug("update() called with dto = {}", dto.toString());

        Optional<TEntity> optional = repository().findById(dto.getId());
        if (!optional.isPresent()) {
            return null;
        }
        TEntity entity = this.mapDtoToEntity(dto);
        return this.mapEntityToDto(repository().save(entity));
    }

    @Override
    public void delete(Long id) {
        logger.debug("delete() called with id = {}", id);

        Optional<TEntity> optional = repository().findById(id);
        if (optional.isPresent()) {
            TEntity entity = optional.get();
            repository().delete(entity);
        }
    }

    @Override
    public TDto mapEntityToDto(TEntity entity) {
        return this.map(entity, this.genericDtoType);
    }

    @Override
    public TEntity mapDtoToEntity(TDto dto) {
        return this.map(dto, this.genericEntityType);
    }

    @Override
    public List<TDto> mapAllEntityToDto(List<TEntity> tEntities) {
        return this.mapAll(tEntities, this.genericDtoType);
    }

    @Override
    public List<TEntity> mapAllDtoToEntity(List<TDto> dtoList) {
        return this.mapAll(dtoList, this.genericEntityType);
    }
}
