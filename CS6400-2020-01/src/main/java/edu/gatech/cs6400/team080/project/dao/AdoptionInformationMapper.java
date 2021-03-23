package edu.gatech.cs6400.team080.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import edu.gatech.cs6400.team080.project.domain.*;



@Mapper
public interface AdoptionInformationMapper {
    @Select("SELECT * FROM AdoptionInformation;")
    List<AdoptionInformationDO> selectAll();
    @Insert("REPLACE INTO AdoptionInformation (application_number, pet_id, adoption_date, adoption_fee) VALUES (#{application_number}, #{pet_id}, #{adoption_date}, #{adoption_fee}); ")
    boolean addAdoptionInformation(
        @Param("application_number") Long application_number,  
        @Param("pet_id") Long pet_id,
        @Param("adoption_date") java.sql.Timestamp adoption_date,
        @Param("adoption_fee") Long adoption_fee
    );

    @Insert("REPLACE INTO Adopter(email,application_number) VALUES ('lsengbusch@plusstrip.com',1); ")
    boolean addAdopterEmailInfo ( @Param("email") String email,  @Param("application_number") Long application_number);

// AdopterDO
    //INSERT IGNORE INTO Adopter(email,application_number) VALUES ('lsengbusch@plusstrip.com',1),

}