package edu.gatech.cs6400.team080.project.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import edu.gatech.cs6400.team080.project.dao.VaccineTypeMapper;
import edu.gatech.cs6400.team080.project.domain.VaccineTypeDO;

@RestController
public class VaccineTypeController {
    private final Logger LOGGER = LoggerFactory.getLogger(VaccineTypeController.class);
    @Autowired
    private VaccineTypeMapper vaccineTypeMapper;
    @RequestMapping("/vaccineType")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<String> selectAll(){
        List<String> result = vaccineTypeMapper.selectAll();
        return result;
    }

    @RequestMapping(value = "/vaccineType", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public boolean insertVaccineType(@RequestBody String vaccineType){
        boolean result = vaccineTypeMapper.insertVaccineType(vaccineType);
        return result;
    }
}