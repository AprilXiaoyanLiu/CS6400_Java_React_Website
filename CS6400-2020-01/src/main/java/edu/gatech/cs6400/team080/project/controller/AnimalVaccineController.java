package edu.gatech.cs6400.team080.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import edu.gatech.cs6400.team080.project.dao.AnimalMapper;
import edu.gatech.cs6400.team080.project.dao.AnimalVaccineMapper;

import edu.gatech.cs6400.team080.project.domain.AnimalVaccineDO;
@RestController
public class AnimalVaccineController {
    @Autowired
    AnimalVaccineMapper animalVaccineMapper;

    @Autowired
    AnimalMapper animalMapper;

    @RequestMapping("/animalVaccine")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<AnimalVaccineDO> selectAll(){
        List<AnimalVaccineDO> result = animalVaccineMapper.selectAll();
        return result;
    }

    @RequestMapping(value = "/animalVaccine", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public boolean insertaAimalVaccine(@RequestBody AnimalVaccineDO animalVaccine){
        if (animalVaccine.pet_id==null) return false;
        synchronized(PetIdSynchronizer.getPetIdSynchronizer(animalVaccine.pet_id)){
            if (animalMapper.selectBaseAnimalById(animalVaccine.pet_id)!=null) {
                boolean result = animalVaccineMapper.insertAnimalVaccine(
                    animalVaccine.pet_id,
                    animalVaccine.vaccine_type,
                    animalVaccine.username,
                    animalVaccine.date_administered,
                    animalVaccine.expiration_date,
                    animalVaccine.vaccination_number
                );
                return result;
            } else {
                return false;
            }
        }
    }
}