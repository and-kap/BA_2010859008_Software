package at.burgenland.bswe.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class EmployeeDto extends BaseDto {
    private String lastname;

    private String job;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long managerId;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private EmployeeDto manager;

    private LocalDateTime hireDate;
    private Long salary;

    private Long commission;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long departmentId;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private DepartmentDto department;
}