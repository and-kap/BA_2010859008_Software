package at.burgenland.bswe.persistence.repository.filter;

import org.springframework.data.jpa.domain.Specification;

import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class EntitySpecificationBuilder<T> {
    public static <T> Optional<Specification<T>> parse(List<String> filters) {
        if (filters == null || filters.isEmpty()) {
            return Optional.empty();
        }

        List<String> checkedFilters = new ArrayList<>();
        List<FilterOperationType> operations = new ArrayList<>();
        filters.forEach(filter -> {
            final var or = FilterOperationType.OR.getType();
            final var and = FilterOperationType.AND.getType();
            if (filter.contains(or)) {
                String[] orFilters = filter.split(Pattern.quote(or));
                Collections.addAll(checkedFilters, orFilters);

                Collections.addAll(operations, (FilterOperationType[]) Stream.generate(() -> FilterOperationType.OR).limit(orFilters.length).toArray());
            } else {
                checkedFilters.add(filter);
                operations.add(FilterOperationType.AND);
            }
        });
        List<Specification<T>> criteria = mapSpecifications(checkedFilters);
        if (criteria.isEmpty()) {
            return Optional.empty();
        }

        Specification<T> root = Specification.where(criteria.get(0));
        for (int i = 1; i < criteria.size(); i++) {
            if (operations.get(i - 1) == FilterOperationType.OR) {
                root = Specification.where(root).or(criteria.get(i));
            } else {
                root = Specification.where(root).and(criteria.get(i));
            }
        }
        return Optional.of(root);
    }

    private static <T> List<Specification<T>> mapSpecifications(List<String> filters) {
        return filters.stream().map(str -> {
            for (FilterOperation operation : FilterOperation.values()) {
                int idx = str.indexOf(operation.getName());
                if (idx > 0) {
                    String key = str.substring(0, idx);
                    String value = str.substring(idx + operation.getName().length());
                    if (value.contains("true")) {
                        return (Specification<T>) (root, query, cb) -> cb.isTrue(root.get(key).as(Boolean.class));
                    } else if (value.contains("false")) {
                        return (Specification<T>) (root, query, cb) -> cb.isFalse(root.get(key).as(Boolean.class));
                    } else {
                        return (Specification<T>) (root, query, cb) -> operation.build(cb, root, key, value);
                    }
                }
            }

            return null;
        }).filter(Objects::nonNull).collect(Collectors.toList());
    }
}
