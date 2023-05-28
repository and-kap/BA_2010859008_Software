package at.burgenland.bswe.persistence.entity;

import at.burgenland.bswe.persistence.base.BaseModel;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "emp")
public class Employee extends BaseModel {
    @Id
    @SequenceGenerator(name="empSeq", sequenceName="emp_seq", allocationSize=5, initialValue = 8000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "empSeq")
    protected Long id;

    @Column
    public String lastname;

    @Column
    public String job;

    @Column(name = "manager_id")
    public Long managerId;

    @Column(name = "hiredate")
    public LocalDateTime hireDate;

    @Column
    public Long salary;

    @Column
    public Long commission;

    @Column(name = "department_id")
    public Long departmentId;

}
