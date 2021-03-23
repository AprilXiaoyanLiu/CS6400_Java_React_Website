package edu.gatech.cs6400.team080.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import edu.gatech.cs6400.team080.project.domain.AnimalAvailableVacTuple;
import edu.gatech.cs6400.team080.project.domain.AnimalVaccineDO;

@Mapper
public interface AnimalVaccineMapper {
    @Select("select * from AnimalVaccine;")
    public List<AnimalVaccineDO> selectAll();

    @Select("select * from AnimalVaccine where pet_id = #{pet_id};")
    public List<AnimalVaccineDO> selectAllVaccineOfOneAnimalByPetId(@Param("pet_id") Long pet_id);
//    @Select("select * from LoginUser where username=#{username}")

//select pet_id , vs.vaccine_type from AnimalVaccine as av inner join AnimalBreed using (pet_id) inner join VaccineSpecies as vs using (species) where vs.vaccine_type NOT IN (select vaccine_type from AnimalVaccine) OR expiration_date < now()    
    @Select("select DISTINCT pet_id , vs.vaccine_type from AnimalVaccine as av inner join AnimalBreed using (pet_id) inner join VaccineSpecies as vs using (species) where vs.vaccine_type NOT IN (select vaccine_type from AnimalVaccine) OR expiration_date < now()")
    public List<AnimalAvailableVacTuple> getAnimalAvailableVaccinationTuples();

    @Insert("INSERT INTO AnimalVaccine (pet_id, vaccine_type, username, date_administered, expiration_date, vaccination_number) VALUES (#{pet_id}, #{vaccine_type}, #{username}, #{date_administered}, #{expiration_date}, #{vaccination_number});")
    public boolean insertAnimalVaccine(
        @Param("pet_id") Long pet_id, 
        @Param("vaccine_type") String vaccine_type, 
        @Param("username") String username, 
        @Param("date_administered") java.sql.Timestamp date_administered, 
        @Param("expiration_date") java.sql.Timestamp expiration_date, 
        @Param("vaccination_number") Long vaccination_number
    ) ;



}