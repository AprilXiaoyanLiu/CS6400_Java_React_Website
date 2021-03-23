package edu.gatech.cs6400.team080.project.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.bind.annotation.CrossOrigin;

import edu.gatech.cs6400.team080.project.domain.UserDO;
import edu.gatech.cs6400.team080.project.service.AnimalService;
import edu.gatech.cs6400.team080.project.service.UserService;

@Controller
public class LoginController {
    @Autowired
    UserService userService;
    @Autowired
    AnimalService animalService;
    private class Credential {
        String username;
        String password;
        public Credential(){}
    }

    @RequestMapping(value={"/login"}, method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    public ModelAndView showLogin(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;
    }
  
    @RequestMapping(value={"/login"}, method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    public String postLogin(HttpServletRequest request, HttpSession session, RedirectAttributes attr){        
        String username = request.getParameter("username");
        String password = request.getParameter("password");        
        try {
            String userStr = userService.selectById(username);
            Gson gson = new Gson();
            UserDO user = gson.fromJson(userStr, UserDO.class);
            if (user.getPassword().equals(password)) {
                attr.addFlashAttribute("userName", "Welcome " + user.getUsertype() + " user: "  + user.getFirst_name());
                attr.addFlashAttribute("userType", user.getUsertype().toString());

                String animalStr = null;
                try {
                    animalStr = animalService.selectAll();
                    System.out.println("animals: " + animalStr);
                } catch (Exception e) {
                    e.printStackTrace();
                    System.out.println("unable to get animals");
                }
                attr.addFlashAttribute("adminMessage",animalStr);

                return "redirect:admin/home";
            } else {
                return "unauthorized";
            }
        } catch (Exception e) {
            return "unauthorized";
        }
        
    }

    // @RequestMapping(value = "/login", method = {RequestMethod.POST, RequestMethod.GET})
    // public String login(HttpServletRequest request, HttpSession session){
    //     ModelAndView modelAndView = new ModelAndView();
    //     modelAndView.setViewName("login");
    //     Map<String,Object> map = new HashMap<String,Object>();

    //     String username = request.getParameter("username");
    //     if (username!=null) {
    //         String password = request.getParameter("password");
    //         String userStr = userService.selectById(username);
    //         Gson gson = new Gson();
    //         JsonObject userJson = gson.fromJson(userStr, JsonObject.class);
    //         if (userJson.get(password).getAsString().equals(password)) {
    //             System.out.println(username + "Login successful");
    //         }
    //         System.out.println(username+password);
    
    //     }
    //     // System.out.println(user);
    //     // session.setAttribute("user", user);
    //     // if (user == null) {
    //     //     map.put("msg","Username is unregistered or the Passowrd wrong");
    //     // } 

    //     return "Login Successful";
    // }

    // //http://localhost:8080/login_ht?username=xli638&password=xli636@gatech.edu
    // @ResponseBody
    // @RequestMapping(value = "/login_ht", method = {RequestMethod.POST, RequestMethod.GET})
    // public Map<String,Object> login(HttpServletRequest request, HttpSession session){
    //     Map<String,Object> map = new HashMap<String,Object>();
    //     String username = request.getParameter("username");
    //     String password = request.getParameter("password");
    //     String name = userService.login(username,password);
    //     System.out.println(username+password);
    //     System.out.println(name);
    //     session.setAttribute("name", name);
    //     if (name == null) {
    //         map.put("msg","Username is unregistered or the Passowrd wrong");
    //     } 
    //     return map;
    // }

    // @RequestMapping("/success")
    // public String success(){
    //     return "success";
    // }


}