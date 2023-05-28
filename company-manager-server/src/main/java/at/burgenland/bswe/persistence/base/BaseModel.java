package at.burgenland.bswe.persistence.base;

import jakarta.persistence.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@MappedSuperclass
public abstract class BaseModel implements Identifiable {
    @Transient
    protected Logger logger = LoggerFactory.getLogger(this.getClass());

}
