package edu.gatech.cs6400.team080.project.service;


import org.springframework.beans.factory.annotation.Autowired;
import com.google.gson.Gson;
import edu.gatech.cs6400.team080.project.dao.SurrenderMapper;
public class SurrenderService {
    @Autowired
    SurrenderMapper surrenderMapper;
    public String selectAll() {
        return new Gson().toJson(surrenderMapper.selectAll());
    }
}
