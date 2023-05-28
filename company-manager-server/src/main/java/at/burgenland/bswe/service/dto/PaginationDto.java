package at.burgenland.bswe.service.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PaginationDto<TDto extends BaseDto> {
    private List<TDto> items;
    private Integer size;
    private Integer page;
    private Long total;
    private Long pageCount;


}
