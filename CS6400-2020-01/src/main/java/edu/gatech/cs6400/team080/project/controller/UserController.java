package edu.gatech.cs6400.team080.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import edu.gatech.cs6400.team080.project.dao.UserMapper;
import edu.gatech.cs6400.team080.project.domain.UserDO;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;
import org.springframework.web.bind.annotation.*;
import org.apache.ibatis.annotations.Results;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class UserController {
    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserMapper userMapper;
    @RequestMapping("/user")
    @CrossOrigin(origins = "http://localhost:3000")

    public List<UserDO> selectAll(){
        List<UserDO> result = userMapper.selectAll();
        System.out.println("result-----:" + result.toString());
        return result;
    }

    @RequestMapping(value = "/user/{username}", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")

    @ResponseBody
    public UserDO selectById(@PathVariable("username") String username){
        UserDO result = userMapper.selectById(username);
        System.out.println("result-----:" + result.toString());
        return result;
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")

    @ResponseBody
    public boolean insertUser(@RequestBody UserDO user){
        if (userMapper.selectById(user.getUsername()) != null) {
            System.out.println("user existed already");
            LOGGER.error("user existed already");
            return false;
        }

        boolean result = userMapper.insertUser(
            user.getUsername(),
            user.getFirst_name(),
            user.getLast_name(),
            user.getEmail_address(),
            user.getPassword(),
            user.getStart_date().toString(),
            user.getUsertype().toString()
            );

        return result;
    }

    @RequestMapping(value = "/user/{username}", method = RequestMethod.PUT)
    @CrossOrigin(origins = "http://localhost:3000")

    @ResponseBody
    public boolean updateUser(@RequestBody UserDO user){
        if (userMapper.selectById(user.getUsername()) != null) {
            boolean result = userMapper.updateUser(
            user.getUsername(),
            user.getFirst_name(),
            user.getLast_name(),
            user.getEmail_address(),
            user.getPassword(),
            user.getStart_date().toString(),
            user.getUsertype().toString()
            );
            return result;
        }

        System.out.println("user does not exist");
        LOGGER.error("user does not exist");

        return false;
    }

    @RequestMapping(value = "/user/{username}", method = RequestMethod.DELETE)
    @CrossOrigin(origins = "http://localhost:3000")

    @ResponseBody
    public boolean DeleteUser(@RequestBody UserDO user){
        if (userMapper.selectById(user.getUsername()) != null) {
            boolean result = userMapper.deleteUser(
            user.getUsername()
            );
            return result;
        }

        System.out.println("user does not exist");
        LOGGER.error("user does not exist");

        return false;
    }
}
