package at.burgenland.bswe.persistence.repository.filter;

import lombok.Getter;

@Getter
public enum FilterOperationType {
    AND("&"),
    OR("||");

    private final String type;

    FilterOperationType(String type) {
        this.type = type;
    }

}
