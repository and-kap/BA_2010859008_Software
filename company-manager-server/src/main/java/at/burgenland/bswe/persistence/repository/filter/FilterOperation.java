package at.burgenland.bswe.persistence.repository.filter;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.AccessLevel;
import lombok.Getter;


@Getter
public enum FilterOperation {
    GREATER_EQUAL_THAN(">=", (b, k, v) -> b.greaterThanOrEqualTo(k, (String) v)),
    GREATER_THAN(">", (b, k, v) -> b.greaterThan(k, (String) v)),

    LESS_EQUAL_THAN("<=", (b, k, v) -> b.lessThanOrEqualTo(k, (String) v)),
    LESS_THAN("<", (b, k, v) -> b.lessThan(k, (String) v)),
    CONTAINS_IGNORE_CASE(":~", (b, k, v) -> b.like(b.lower(k), b.literal("%" + v.toString().toLowerCase() + "%"))),
    CONTAINS(":=", (b, k, v) -> b.like(k, b.literal("%" + v.toString() + "%"))),

    EQUALS("==", CriteriaBuilder::equal),

    NOT_EQUALS("!=", CriteriaBuilder::notEqual);

    private final String name;
    @Getter(AccessLevel.NONE)
    private final FilterPredicateFunction operation;

    private FilterOperation(String name, FilterPredicateFunction operation) {
        this.name = name;
        this.operation = operation;
    }

    public Predicate build(CriteriaBuilder builder, Root<?> entity, String key, Object value) {
        if (key.contains("_obj")) {
            key = key.replace("_obj", "");

            Class<?> tempClass = entity.get(key).getJavaType();
            Object enumValue = Enum.valueOf((Class) tempClass, value.toString());

            return operation.predicate(builder, entity.get(key), enumValue);
        }
        return operation.predicate(builder, entity.get(key), value.toString());
    }

    @FunctionalInterface
    interface FilterPredicateFunction {
        Predicate predicate(CriteriaBuilder builder, Path<String> key, Object value);
    }
}
