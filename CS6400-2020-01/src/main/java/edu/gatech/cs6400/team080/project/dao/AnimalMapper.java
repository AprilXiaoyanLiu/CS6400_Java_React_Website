package edu.gatech.cs6400.team080.project.dao;

import java.util.List;

import edu.gatech.cs6400.team080.project.domain.Animal;
import edu.gatech.cs6400.team080.project.domain.AnimalAllInfo;
import edu.gatech.cs6400.team080.project.domain.BaseAnimal;

import org.apache.ibatis.annotations.*;

@Mapper
public interface AnimalMapper {
    String base_query = "select a.*, Breed.species, case when ado.pet_id is NULL then 'not_adopted' else 'adopted' end as adoption_status, group_concat(distinct b.breed order by b.breed separator ',') as breed from Animal a left join AnimalBreed b on a.pet_id = b.pet_id left join Breed on b.breed = Breed.breed left join AdoptionInformation ado on ado.pet_id = a.pet_id";
    String select_all_query = base_query + " group by 1,2,3,4,5,6,7,8";
    String select_all_query_with_surrender = "select * from (select a.*, Breed.species, case when ado.pet_id is NULL then 'not_adopted' else 'adopted' end as adoption_status, group_concat(distinct b.breed order by b.breed separator ',') as breed from Animal a left join AnimalBreed b on a.pet_id = b.pet_id left join Breed on b.breed = Breed.breed left join AdoptionInformation ado on ado.pet_id = a.pet_id group by 1,2,3,4,5,6,7,8) as animallessinfo left join Surrender on animallessinfo.pet_id=Surrender.pet_id";
    @Select("SELECT * FROM (select *, CASE WHEN a.pet_id NOT IN (SELECT pet_id from AdoptionInformation) then 'not_adopted' else 'adopted' end as adoption_status  from Animal as a join Surrender  AS surren using (pet_id)  ) tsur LEFT JOIN (SELECT pet_id, group_concat(breed) as breed FROM AnimalBreed left join Animal using (pet_id) group by pet_id) tspecies ON tsur.pet_id=tspecies.pet_id;")
    List<Animal> selectAll();

    @Select("SELECT * FROM (select *, CASE WHEN a.pet_id NOT IN (SELECT pet_id from AdoptionInformation) then 'not_adopted' else 'adopted' end as adoption_status  from Animal as a join Surrender  AS surren using (pet_id)  ) tsur LEFT JOIN (SELECT pet_id, group_concat(breed) as breed FROM AnimalBreed left join Animal using (pet_id) group by pet_id) tspecies ON tsur.pet_id=tspecies.pet_id;")
    List<AnimalAllInfo> selectAnimalAllInfoAll();

    @Select("select * from Animal")
    List<BaseAnimal> selectBaseAnimal();

    @Select("SELECT LAST_INSERT_ID()")
    String getLastInsertAnimalId();

    @Select("SELECT * FROM (select *, CASE WHEN a.pet_id NOT IN (SELECT pet_id from Surrender) then 'adopted' else 'not_adopted' end as adoption_status  from Animal as a join Surrender  AS surren using (pet_id)  ) tsur LEFT JOIN (SELECT pet_id, group_concat(breed) as breed FROM AnimalBreed left join Animal using (pet_id) group by pet_id) tspecies ON tsur.pet_id=tspecies.pet_id where tsur.pet_id = #{pet_id}")
    public AnimalAllInfo selectAnimalAllInfoAllById(@Param("pet_id") String pet_id);

    @Select("SELECT * FROM Animal WHERE pet_id=#{pet_id}")
    public Animal selectBaseAnimalById(@Param("pet_id") Long pet_id);

    @Select(base_query + " where Breed.species=#{species} group by 1,2,3,4,5,6,7,8;")
    Animal selectBySpecies(@Param("species") String species);
    @Insert("REPLACE INTO Animal(pet_id, pet_name, sex, age, alteration_status, descriptions, microchipId, species) VALUES (#{pet_id}, #{pet_name}, #{sex}, #{age}, #{alteration_status}, #{descriptions}, #{microchipId}, #{species});")
    boolean insertAnimal(
        @Param("pet_id") Long pet_id,
        @Param("pet_name") String pet_name, 
        @Param("sex") String sex, 
        @Param("age") Integer age, 
        @Param("alteration_status") String alteration_status, 
        @Param("descriptions") String descriptions, 
        @Param("microchipId") String microchipId,
        @Param("species") String species    
    );



 @Insert("Insert INTO Animal(pet_id, pet_name, sex, age, alteration_status, descriptions, microchipId) VALUES (#{pet_id}, #{pet_name}, #{sex}, #{age}, #{alteration_status}, #{descriptions}, #{microchipId});")
    boolean insertBaseAnimal(
        @Param("pet_id") Long pet_id, 
        @Param("pet_name") String pet_name, 
        @Param("sex") String sex, 
        @Param("age") Integer age, 
        @Param("alteration_status") String alteration_status, 
        @Param("descriptions") String descriptions, 
        @Param("microchipId") String microchipId);

}