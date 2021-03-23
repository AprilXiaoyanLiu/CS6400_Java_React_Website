package edu.gatech.cs6400.team080.project.dao;
import java.util.List;

import org.apache.ibatis.annotations.*;

import edu.gatech.cs6400.team080.project.domain.VaccineSpeciesDO;
@Mapper
public interface VaccineSpeciesMapper {
    @Select("select * from VaccineSpecies")
    public List<VaccineSpeciesDO> selectAll();
    @Insert("REPLACE INTO VaccineSpecies(species, vaccine_type, required_for_adoption) VALUES (#{species}, #{vaccine_type}, #{required_for_adoption}) ON DUPLICATE KEY UPDATE required_for_adoption=#{required_for_adoption};")
    public boolean insertVaccineType(@Param("species") String species, @Param("vaccine_type") String vaccine_type, @Param("required_for_adoption") boolean required_for_adoption) ;
}