package at.burgenland.bswe.service.base;

import java.util.List;

public interface IMapper<TDto, TEntity> {
    TDto mapEntityToDto(TEntity entity);

    TEntity mapDtoToEntity(TDto dto);

    List<TDto> mapAllEntityToDto(List<TEntity> entityList);

    List<TEntity> mapAllDtoToEntity(List<TDto> dtoList);
}
