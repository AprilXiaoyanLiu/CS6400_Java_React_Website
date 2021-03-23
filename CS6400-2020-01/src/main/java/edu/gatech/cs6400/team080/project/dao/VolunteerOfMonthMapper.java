package edu.gatech.cs6400.team080.project.dao;


import java.util.List;
import org.apache.ibatis.annotations.*;

import edu.gatech.cs6400.team080.project.domain.VolunteerOfMonthDO;

@Mapper
public interface VolunteerOfMonthMapper {
    /*
    select first_name, last_name, email_address, sum(hoursWorked) as total_hours from LoginUser L inner join VolunteerWorkHours V on L.username = V.username where month(dateWorked) = 1 and YEAR(dateWorked) = 2019 group by L.username order by sum(hoursWorked) DESC, last_name ASC LIMIT 5;
    */

    @Select("select first_name, last_name, email_address, sum(hoursWorked) as total_hours from LoginUser L inner join VolunteerWorkHours V on L.username = V.username where month(dateWorked) = #{selected_month} and YEAR(dateWorked) = #{selected_year} group by L.username order by sum(hoursWorked) DESC, last_name ASC LIMIT 5;")
    public List<VolunteerOfMonthDO> getVolunteerOfMonnth(@Param("selected_month") Long selected_month, @Param("selected_year") Long selected_year);
}