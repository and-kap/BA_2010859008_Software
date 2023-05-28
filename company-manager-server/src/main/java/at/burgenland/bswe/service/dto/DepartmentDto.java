package at.burgenland.bswe.service.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class DepartmentDto extends BaseDto {
    private String name;
    private String location;

    private Long employees;
}
