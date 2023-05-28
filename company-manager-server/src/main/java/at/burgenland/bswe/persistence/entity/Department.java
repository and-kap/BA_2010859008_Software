package at.burgenland.bswe.persistence.entity;

import at.burgenland.bswe.persistence.base.BaseModel;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "dept")
public class Department extends BaseModel {
    @Id
    @SequenceGenerator(name="deptSeq", sequenceName="dept_seq", allocationSize=10, initialValue = 50)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "deptSeq")
    protected Long id;
    @Column
    public String name;
    @Column
    public String location;

}
