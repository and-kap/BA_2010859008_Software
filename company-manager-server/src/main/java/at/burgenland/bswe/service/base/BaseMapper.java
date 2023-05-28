package at.burgenland.bswe.service.base;

import at.burgenland.bswe.persistence.base.BaseModel;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

public abstract class BaseMapper {
    protected Logger logger = LoggerFactory.getLogger(this.getClass());

    protected ModelMapper modelMapper;

    public BaseMapper() {
        this.modelMapper = new ModelMapper();
        this.modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    }

    public <T> String convertObjectToString(T object) {
        String str = null;
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            str = objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return str;
    }

    public <D, T> D map(Optional<T> entity, Class<D> outClass) {
        return entity.map(t -> modelMapper.map(t, outClass)).orElse(null);
    }

    public <D, T> D map(T entity, Class<D> outClass) {
        return modelMapper.map(entity, outClass);
    }

    public <D, T> void map(T t, D d) {
        modelMapper.map(t, d);
    }

    public <D, T> List<D> mapAll(Collection<T> entityList, Class<D> outClass) {
        return entityList.stream().map(entity -> map(entity, outClass)).collect(Collectors.toList());
    }

    public <D, T> Set<D> mapAllSet(Collection<T> entitySet, Class<D> outClass) {
        return entitySet.stream().map(entity -> map(entity, outClass)).collect(Collectors.toSet());
    }
}
