package edu.gatech.cs6400.team080.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.*;

import edu.gatech.cs6400.team080.project.domain.VaccineReminderDO;
import edu.gatech.cs6400.team080.project.domain.VaccineSpeciesDO;


@Mapper
public interface VaccineReminderMapper {
    @Select("SELECT withoutuser.* , LoginUser.first_name, LoginUser.last_name FROM LoginUser inner join (SELECT  goal.*, allinfo.surrender_date, allinfo.alteration_status, allinfo.sex, allinfo.microchipId, allinfo.breed, allinfo.species FROM  (SELECT tsur.pet_id, tsur.surrender_date, tsur.alteration_status, tsur.sex, tsur.microchipId, tspecies.breed, tsur.species FROM (select *, CASE WHEN a.pet_id NOT IN (SELECT pet_id from AdoptionInformation) then 'not_adopted' else 'adopted' end as adoption_status  from Animal as a join Surrender  AS surren using (pet_id)  ) tsur LEFT JOIN (SELECT pet_id, group_concat(breed) as breed FROM AnimalBreed left join Animal using (pet_id) group by pet_id) tspecies ON tsur.pet_id=tspecies.pet_id) allinfo inner join (select avac.username, avac.pet_id, avac.expiration_date, amaxvac.vaccine_type from  (select username, pet_id, expiration_date from AnimalVaccine) avac  inner join  (select pet_id, vaccine_type, max(expiration_date) as expiration_date from AnimalVaccine where UNIX_TIMESTAMP(expiration_date) - UNIX_TIMESTAMP() < 2592000 group by vaccine_type, pet_id) amaxvac on avac.expiration_date = amaxvac.expiration_date and avac.pet_id = amaxvac.pet_id) goal on allinfo.pet_id = goal.pet_id) withoutuser on LoginUser.username = withoutuser.username order by expiration_date ASC, pet_id ASC")
    public List<VaccineReminderDO> selectAll();
}
