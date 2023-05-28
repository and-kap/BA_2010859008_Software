package at.burgenland.bswe.service.dto;

import at.burgenland.bswe.persistence.base.Identifiable;

public abstract class BaseDto implements Identifiable {
    private Long id;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }
}
