package edu.gatech.cs6400.team080.project.controller;

import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.bind.annotation.CrossOrigin;


import edu.gatech.cs6400.team080.project.dao.AnimalMapper;
import edu.gatech.cs6400.team080.project.dao.UserMapper;
import edu.gatech.cs6400.team080.project.domain.UserDO;
import edu.gatech.cs6400.team080.project.service.AnimalService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;


@RestController
public class AnimalDashboardController {

    @RequestMapping(value={"/admin/home"}, method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")

    public ModelAndView animalDashboardDisplay(Model model) {

        Map<String, Object> map = model.asMap();
        if (map.isEmpty()) {
            // add more logic here.
            return new ModelAndView("error");
        }

        System.out.println("printing the redirect attributes");
        System.out.println(model);
        // String userType = redirectAttributes.getAttribute("userType").toString();
        // System.out.println(userType);


        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/admin/home");
        return modelAndView;
    }

}
