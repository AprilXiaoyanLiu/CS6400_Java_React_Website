package edu.gatech.cs6400.team080.project.dao;

import edu.gatech.cs6400.team080.project.domain.SpeciesDO;
import edu.gatech.cs6400.team080.project.domain.SpeciesEnum;
import edu.gatech.cs6400.team080.project.domain.UserDO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SpeciesMapper {
    @Select("select * from Species")
    List<SpeciesEnum> selectAll();
}
