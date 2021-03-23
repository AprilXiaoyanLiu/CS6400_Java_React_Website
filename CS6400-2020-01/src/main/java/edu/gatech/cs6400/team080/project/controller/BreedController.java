package edu.gatech.cs6400.team080.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import edu.gatech.cs6400.team080.project.dao.*;
import edu.gatech.cs6400.team080.project.domain.*;


@RestController
public class BreedController {
    @Autowired
    private BreedMapper breedMapper;
    @RequestMapping("/breed")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<BreedDO> selectAll(){
        List<BreedDO> result = breedMapper.selectAll();
        return result;
    }
    @RequestMapping(value = "/breed", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public boolean insertVaccineType(@RequestBody BreedDO breedDo){
        boolean result = breedMapper.insertBreed(breedDo.getBreed(), breedDo.getSpecies());
        return result;
    }


}