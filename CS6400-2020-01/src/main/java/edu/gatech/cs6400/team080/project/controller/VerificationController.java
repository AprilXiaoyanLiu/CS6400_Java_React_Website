package edu.gatech.cs6400.team080.project.controller;

import java.util.List;

import com.google.gson.Gson;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import edu.gatech.cs6400.team080.project.dao.UserMapper;
import edu.gatech.cs6400.team080.project.dao.VaccineTypeMapper;
import edu.gatech.cs6400.team080.project.domain.UserDO;
import edu.gatech.cs6400.team080.project.domain.UserType;
import edu.gatech.cs6400.team080.project.domain.VaccineTypeDO;


@RestController
public class VerificationController {
    private final Logger LOGGER = LoggerFactory.getLogger(VaccineTypeController.class);
    @Autowired
    private UserMapper userMapper;

    private class Credential {
        String username;
        String password;

        public Credential() {
        }
    }

    @RequestMapping(value = "/verifyUser", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public String verifyUser(@RequestBody Credential cred) {
        Gson gson = new Gson();
        String inputString = gson.toJson(cred);
        System.out.println(inputString);
        UserDO result = userMapper.selectById(cred.username);

        if (result == null) return UserType.unauthorized.name();
        if (result.getPassword().equals(cred.password)) {
            return result.getUsertype().name();
        } else {
            return UserType.unauthorized.name();
        }
    }

}