package edu.gatech.cs6400.team080.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.*;

import edu.gatech.cs6400.team080.project.domain.VaccineTypeDO;

@Mapper
public interface VaccineTypeMapper {
    @Select("select * from VaccineType")
    public List<String> selectAll();
    @Insert("REPLACE INTO VaccineType (vaccine_type) VALUES (#{vaccine_type});")
    public boolean insertVaccineType(@Param("vaccine_type") String vaccine_type) ;
}
