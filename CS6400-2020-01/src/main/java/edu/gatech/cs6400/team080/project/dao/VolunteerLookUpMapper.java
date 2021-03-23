package edu.gatech.cs6400.team080.project.dao;

import java.util.List;
import org.apache.ibatis.annotations.*;

import edu.gatech.cs6400.team080.project.domain.VolunteerLookUp;

@Mapper
public interface VolunteerLookUpMapper {

    @Select("SELECT l.first_name,l.last_name,v.phone_number,l.email_address FROM Volunteer v LEFT JOIN LoginUser l ON v.username = l.username WHERE l.first_name LIKE CONCAT(#{first_name},'%') AND l.last_name LIKE CONCAT(#{last_name},'%')ORDER BY l.last_name,l.first_name;")
    public List<VolunteerLookUp>getVolunteerLookUp(@Param("first_name") String first_name, @Param("last_name") String last_name);

}