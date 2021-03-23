package edu.gatech.cs6400.team080.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;


import edu.gatech.cs6400.team080.project.dao.VolunteerLookUpMapper;
import edu.gatech.cs6400.team080.project.domain.VolunteerLookUp;

@RestController
public class VolunteerLookUpController {

    public static class VolunteerLookUpCommunication{
        String first_name;
        String last_name;
    }

    @Autowired
    private VolunteerLookUpMapper volunteerLookUpMapper;
    @RequestMapping(value = "/volunteerLookUp", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")

    @ResponseBody
    public List<VolunteerLookUp> getVolunteerbyName(@RequestBody VolunteerLookUpCommunication volunteerLookUpCommunication){

        return volunteerLookUpMapper.getVolunteerLookUp(volunteerLookUpCommunication.first_name, volunteerLookUpCommunication.last_name);
    }
}
