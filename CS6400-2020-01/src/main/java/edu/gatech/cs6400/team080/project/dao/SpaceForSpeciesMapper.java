package edu.gatech.cs6400.team080.project.dao;

import java.util.List;
import org.apache.ibatis.annotations.*;
import edu.gatech.cs6400.team080.project.domain.*;

@Mapper
public interface SpaceForSpeciesMapper {


    String unadopted = "(select a.pet_id, a.species from Animal a left join AdoptionInformation b on a.pet_id = b.pet_id where b.pet_id is null)";
    @Select("select * from TotalSpaceForSpecies")
    List<TotalSpaceForSpecies> selectTotalSpace();
    /* select a.*, Breed.species, 
    case when ado.pet_id is NULL then 'not adopted' 
    else 'adopted' 
    end as adoption_status, 
    group_concat(distinct b.breed order by b.breed separator ',') as breed 
    from Animal a left join AnimalBreed b on a.pet_id = b.pet_id left join Breed on b.breed = Breed.breed left join AdoptionInformation ado on ado.pet_id = a.pet_id 
    group by 1,2,3,4,5,6,7,8
    */
    @Select("select m.species, (m.max_count - s.counts) as left_space from species_cap as m left join (select species, count(distinct pet_id) as counts from "+unadopted +"as c group by 1) as s on s.species = m.species;")
    List<LeftSpaceForSpecies> selectLeftSpace();
    
}