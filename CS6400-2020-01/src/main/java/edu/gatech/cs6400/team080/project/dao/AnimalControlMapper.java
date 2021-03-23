package edu.gatech.cs6400.team080.project.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import edu.gatech.cs6400.team080.project.domain.AnimalControlDO;


@Mapper
public interface AnimalControlMapper {


    /*
    SELECT a.pet_id, Breed.species, sex, alteration_status, microchipId, surrender_date, group_concat(distinct b.breed order by b.breed separator ',') as breed FROM Animal a left join AnimalBreed b on a.pet_id = b.pet_id left join Breed on b.breed = Breed.breed left join Surrender s on s.pet_id = a.pet_id WHERE MONTH(surrender_date) = 1 and s.animalcontrol = 1 group by 1,2,3 order by pet_id ASC; 
    */
    @Select("SELECT a.pet_id, Breed.species, sex, alteration_status, microchipId, surrender_date, group_concat(distinct b.breed order by b.breed separator ',') as breed FROM Animal a left join AnimalBreed b on a.pet_id = b.pet_id left join Breed on b.breed = Breed.breed left join Surrender s on s.pet_id = a.pet_id WHERE MONTH(surrender_date) = #{selected_month} and s.animalcontrol = 1 group by 1,2,3 order by pet_id ASC;")
    public List<AnimalControlDO> getAnimalControlSurrenderByMonth(@Param("selected_month") Integer seleted_month );

    @Select("SELECT a.pet_id, Breed.species, sex, alteration_status, microchipId, surrender_date, group_concat(distinct b.breed order by b.breed separator ',') as breed FROM Animal a left join AnimalBreed b on a.pet_id = b.pet_id left join Breed on b.breed = Breed.breed left join Surrender s on s.pet_id = a.pet_id WHERE s.animalcontrol = 1 group by 1,2,3 order by pet_id ASC;")
    public List<AnimalControlDO> getAnimalControlSurrender();

    /*
    SELECT s.pet_id, surrender_date, adoption_date from Surrender s inner join AdoptionInformation ado on s.pet_id = ado.pet_id WHERE MONTH(surrender_date) =7 group by 1,2,3 order by pet_id DESC;
    SELECT s.pet_id, surrender_date, adoption_date from Surrender s inner join AdoptionInformation ado on s.pet_id = ado.pet_id WHERE MONTH(adoption_date) =7 and YEAR(adoption_date)=2019 group by 1,2,3 order by pet_id DESC;
    
    SELECT s.pet_id, DATEDIFF(adoption_date, surrender_date) as rescue_days from Surrender s inner join AdoptionInformation ado on s.pet_id = ado.pet_id WHERE MONTH(surrender_date) =7 group by 1,2 order by pet_id DESC;

    SELECT s.pet_id, DATEDIFF(adoption_date,surrender_date) as rescue_days from Surrender s inner join AdoptionInformation ado on s.pet_id = ado.pet_id WHERE MONTH(surrender_date) =7 and DATEDIFF(adoption_date,surrender_date) >= 60 group by 1,2 order by DATEDIFF(adoption_date,surrender_date) DESC;
    SELECT a.pet_id, Breed.species, sex, alteration_status, microchipId, surrender_date, group_concat(distinct b.breed order by b.breed separator ',') as breed, DATEDIFF(adoption_date,surrender_date) as rescue_days FROM Animal a left join AnimalBreed b on a.pet_id = b.pet_id left join Breed on b.breed = Breed.breed inner join Surrender s on s.pet_id = a.pet_id inner join AdoptionInformation ado on ado.pet_id = a.pet_id WHERE MONTH(adoption_date) =MONTH(CURDATE()) and YEAR(adoption_date)=YEAR(CURDATE()) and DATEDIFF(adoption_date,surrender_date) >= 60 group by 1,2,3, adoption_date order by DATEDIFF( adoption_date,surrender_date) DESC;
    
    SELECT a.pet_id, Breed.species, sex, alteration_status, microchipId, surrender_date, group_concat(distinct b.breed order by b.breed separator ',') as breed, DATEDIFF(adoption_date,surrender_date) as rescue_days FROM Animal a left join AnimalBreed b on a.pet_id = b.pet_id left join Breed on b.breed = Breed.breed inner join Surrender s on s.pet_id = a.pet_id inner join AdoptionInformation ado on ado.pet_id = a.pet_id WHERE MONTH(surrender_date) = #{selected_month} and DATEDIFF(adoption_date,surrender_date) >= 60 group by 1,2,3, adoption_date order by DATEDIFF( adoption_date,surrender_date) DESC;
    */
    @Select("SELECT a.pet_id, Breed.species, sex, alteration_status, microchipId, surrender_date, group_concat(distinct b.breed order by b.breed separator ',') as breed, DATEDIFF(adoption_date,surrender_date) as rescue_days FROM Animal a left join AnimalBreed b on a.pet_id = b.pet_id left join Breed on b.breed = Breed.breed inner join Surrender s on s.pet_id = a.pet_id inner join AdoptionInformation ado on ado.pet_id = a.pet_id WHERE MONTH(surrender_date) = #{selected_month} and DATEDIFF(adoption_date,surrender_date) >= 60 group by 1,2,3, adoption_date order by DATEDIFF( adoption_date,surrender_date) DESC;")
    public List<AnimalControlDO> getAdoptedByMonth(@Param("selected_month") Integer selected_month );


    @Select("SELECT a.pet_id, Breed.species, sex, alteration_status, microchipId, surrender_date, group_concat(distinct b.breed order by b.breed separator ',') as breed, DATEDIFF(adoption_date,surrender_date) as rescue_days FROM Animal a left join AnimalBreed b on a.pet_id = b.pet_id left join Breed on b.breed = Breed.breed inner join Surrender s on s.pet_id = a.pet_id inner join AdoptionInformation ado on ado.pet_id = a.pet_id WHERE DATEDIFF(adoption_date,surrender_date) >= 60 group by 1,2,3, adoption_date order by DATEDIFF( adoption_date,surrender_date) DESC;")
    public List<RescueDO> getAdopted();

}

