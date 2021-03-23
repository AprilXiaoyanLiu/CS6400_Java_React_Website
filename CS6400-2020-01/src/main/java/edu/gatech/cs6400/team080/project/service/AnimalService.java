package edu.gatech.cs6400.team080.project.service;

import com.google.gson.Gson;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import edu.gatech.cs6400.team080.project.dao.AnimalMapper;

@Service
public class AnimalService {
    @Autowired
    AnimalMapper animalMapper;
    public String selectAll() {
        return new Gson().toJson(animalMapper.selectAll());
    }
}