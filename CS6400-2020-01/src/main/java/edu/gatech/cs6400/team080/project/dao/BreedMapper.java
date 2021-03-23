package edu.gatech.cs6400.team080.project.dao;

import java.util.List;
import org.apache.ibatis.annotations.*;
import edu.gatech.cs6400.team080.project.domain.BreedDO;

@Mapper
public interface BreedMapper {
    @Select("select * from Breed")
    List<BreedDO> selectAll();
    @Insert("REPLACE INTO Breed (breed, species) VALUES (#{breed},#{species});")
    public boolean insertBreed(@Param("breed") String breed, @Param("species") String species) ;
}