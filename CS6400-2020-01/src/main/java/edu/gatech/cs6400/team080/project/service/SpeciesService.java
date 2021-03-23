package edu.gatech.cs6400.team080.project.service;

import com.google.gson.Gson;
import edu.gatech.cs6400.team080.project.dao.SpeciesMapper;
import edu.gatech.cs6400.team080.project.dao.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class SpeciesService {
    @Autowired
    SpeciesMapper speciesMapper;
    public String selectAll() {
        return new Gson().toJson(speciesMapper.selectAll());
    }
}
