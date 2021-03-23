package edu.gatech.cs6400.team080.project.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

import edu.gatech.cs6400.team080.project.domain.SurrenderDO;

@Mapper
public interface SurrenderMapper {
    @Select("select * from Surrender")
    List<SurrenderDO> selectAll();
    @Insert("INSERT INTO Surrender (pet_id, animalcontrol, surrender_reason, surrender_date) VALUES (#{pet_id}, #{animalcontrol}, #{surrender_reason}, #{surrender_date});")
    boolean insertSurrenderInfo(
        @Param("pet_id") Long pet_id, 
        @Param("animalcontrol") Boolean animalcontrol, 
        @Param("surrender_reason") String surrender_reason, 
        @Param("surrender_date") java.sql.Timestamp surrender_date
    );
}
