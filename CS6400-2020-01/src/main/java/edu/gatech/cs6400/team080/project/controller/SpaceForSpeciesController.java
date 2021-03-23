package edu.gatech.cs6400.team080.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import edu.gatech.cs6400.team080.project.dao.SpaceForSpeciesMapper;
import edu.gatech.cs6400.team080.project.domain.*;


@RestController
public class SpaceForSpeciesController {
    @Autowired
    private SpaceForSpeciesMapper spaceForSpeciesMapper;
    @RequestMapping("/totalSpace")
    @CrossOrigin(origins = "http://localhost:3000")


    public List<TotalSpaceForSpecies> totalSpace(){
        List<TotalSpaceForSpecies> result = spaceForSpeciesMapper.selectTotalSpace();
        return result;
    }
    @RequestMapping("/leftSpace")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<LeftSpaceForSpecies> leftSpace(){
        List<LeftSpaceForSpecies> result = spaceForSpeciesMapper.selectLeftSpace();
        return result;
    }
}
