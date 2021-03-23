package edu.gatech.cs6400.team080.project.controller;

import edu.gatech.cs6400.team080.project.dao.AnimalMapper;
import edu.gatech.cs6400.team080.project.domain.SpeciesEnum;
import edu.gatech.cs6400.team080.project.dao.SpeciesMapper;

import edu.gatech.cs6400.team080.project.domain.SpeciesDO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.google.gson.annotations.SerializedName;

/*
 "species":[{"id": 1, "species": "Dog"},
            {"id": 2, "species":"Cat"}],
*/


@RestController
public class SpeciesController {
    public static class SpeciesWithId {

        @SerializedName("species")
        public String species;

        @SerializedName("id")
        public Integer id;
        public SpeciesWithId(SpeciesEnum speciesEnum){
            this.species = speciesEnum.name();
            this.id = speciesEnum.getKey();
        }
    }
    @Autowired
    private SpeciesMapper speciesMapper;
    @RequestMapping("/species")
    @CrossOrigin(origins = "http://localhost:3000")

    public List<SpeciesWithId> selectAll(){

        List<SpeciesEnum> tmpresult = speciesMapper.selectAll();
        List<SpeciesWithId> result = new ArrayList<>();
        Collections.sort(tmpresult, (a,b)->a.name().compareTo(b.name()));
        for (int i=0; i<tmpresult.size(); i++) {
            result.add(new SpeciesWithId(tmpresult.get(i)));
        }
        return result;
    }
}
