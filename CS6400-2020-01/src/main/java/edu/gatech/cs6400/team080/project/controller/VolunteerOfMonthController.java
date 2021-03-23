package edu.gatech.cs6400.team080.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;


import edu.gatech.cs6400.team080.project.dao.VolunteerOfMonthMapper;
import edu.gatech.cs6400.team080.project.domain.VolunteerOfMonthDO;


@RestController
public class VolunteerOfMonthController {

    public static class VolunteerOfMonthCommunication {
        Long selected_month;
        Long selected_year;
    }

    @Autowired
    private VolunteerOfMonthMapper volunteerOfMonthMapper;
    @RequestMapping(value = "/volunteerOfMonth", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")

    @ResponseBody
    public List<VolunteerOfMonthDO> getVolunteerbyMonthYear(@RequestBody VolunteerOfMonthCommunication volunteerOfMonthCommunication){

        return volunteerOfMonthMapper.getVolunteerOfMonnth(volunteerOfMonthCommunication.selected_month, volunteerOfMonthCommunication.selected_year);
    }
}
