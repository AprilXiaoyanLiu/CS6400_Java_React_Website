package edu.gatech.cs6400.team080.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;
import edu.gatech.cs6400.team080.project.domain.SurrenderDO;
import edu.gatech.cs6400.team080.project.dao.SurrenderMapper;
@RestController
public class SurrenderController {
    @Autowired
    private SurrenderMapper surrenderMapper;
    @RequestMapping("/surrender")
    @CrossOrigin(origins = "http://localhost:3000")

    public List<SurrenderDO> selectAll(){
        List<SurrenderDO> result = surrenderMapper.selectAll();
        return result;
    }}
