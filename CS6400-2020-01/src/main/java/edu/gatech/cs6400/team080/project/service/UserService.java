package edu.gatech.cs6400.team080.project.service;

import com.google.gson.Gson;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.gatech.cs6400.team080.project.dao.UserMapper;


@Service
public class UserService {
    @Autowired
    UserMapper userMapper;
    public String login(String username,String password){
        return userMapper.login(username,password);
    }
    public String selectById(String username) {
        return new Gson().toJson(userMapper.selectById(username));
    }
}