package edu.gatech.cs6400.team080.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import edu.gatech.cs6400.team080.project.domain.*;


@Mapper
public interface AnimalBreedMapper {
    @Select("SELECT * FROM AnimalBreed;")
    List<AnimalBreed> selectAll();
    
    @Insert("REPLACE INTO Breed (breed, species) VALUES (#{breed},#{species});")
    boolean insertNewBreedInSpecies(@Param("breed") String breed, @Param("species") String species);

    @Insert("REPLACE INTO AnimalBreed(pet_id, breed, species) VALUES (#{pet_id},  #{breed}, #{species});")
    boolean insertNewAnimalBreed(@Param("pet_id") Long pet_id, @Param("breed") String breed, @Param("species") String species);

}