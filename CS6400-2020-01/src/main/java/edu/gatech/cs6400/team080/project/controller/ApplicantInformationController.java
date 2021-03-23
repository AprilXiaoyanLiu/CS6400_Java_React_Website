package edu.gatech.cs6400.team080.project.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

import edu.gatech.cs6400.team080.project.dao.AdoptionInformationMapper;
import edu.gatech.cs6400.team080.project.dao.AnimalVaccineMapper;
import edu.gatech.cs6400.team080.project.dao.ApplicantInformationMapper;
import edu.gatech.cs6400.team080.project.domain.*;

@RestController
public class ApplicantInformationController {

    public static int statusConvert(String status) {
        if (status.toLowerCase().charAt(0) == 'a') {
            return 1;
        }
        if (status.toLowerCase().charAt(0) == 'r' || status.toLowerCase().charAt(0) == 'd' ) {
            return 2;
        }
        return 3;
    }

    public static String statusConvertBack(int status) {
        switch (status) {
            case 1:
                return "approved";
            case 2:
                return "rejected";
            default:
                return "pending";
        }
    }

    public static class ApplicantInformationDOWithIndex {
        public Long application_number;
        public String applicant_first_name;
        public String applicant_last_name;
        public String coapplicant_first_name;
        public String coapplicant_last_name;
        public String street;
        public String city;
        public String state;
        public Long zipcode;
        public String phone_number;
        public String application_date;
        public int status;

        public ApplicantInformationDOWithIndex(ApplicantInformationDO applicantInformationDO) {
            this.application_number = applicantInformationDO.application_number;
            this.applicant_first_name = applicantInformationDO.applicant_first_name;
            this.applicant_last_name = applicantInformationDO.applicant_last_name;
            this.coapplicant_last_name = applicantInformationDO.coapplicant_last_name;
            this.coapplicant_first_name = applicantInformationDO.coapplicant_first_name;
            this.street = applicantInformationDO.street;
            this.state = applicantInformationDO.state;
            this.city = applicantInformationDO.city;
            this.zipcode = applicantInformationDO.zipcode;
            this.phone_number = applicantInformationDO.phone_number;
            this.application_date = applicantInformationDO.application_date;
            this.status = statusConvert(applicantInformationDO.status);
        }
    }

    public static class ApplicantInformationDOWithIndexEmailBack {
        public Long application_number;
        public String applicant_first_name;
        public String applicant_last_name;
        public String coapplicant_first_name;
        public String coapplicant_last_name;
        public String street;
        public String city;
        public String state;
        public Long zipcode;
        public String phone_number;
        public String application_date;
        public String status;

        public ApplicantInformationDOWithIndexEmailBack(ApplicantInformationDOWithIndex applicantInformationDO) {
            this.application_number = applicantInformationDO.application_number;
            this.applicant_first_name = applicantInformationDO.applicant_first_name;
            this.applicant_last_name = applicantInformationDO.applicant_last_name;
            this.coapplicant_last_name = applicantInformationDO.coapplicant_last_name;
            this.coapplicant_first_name = applicantInformationDO.coapplicant_first_name;
            this.street = applicantInformationDO.street;
            this.state = applicantInformationDO.state;
            this.city = applicantInformationDO.city;
            this.zipcode = applicantInformationDO.zipcode;
            this.phone_number = applicantInformationDO.phone_number;
            this.application_date = applicantInformationDO.application_date;
            this.status = statusConvertBack(applicantInformationDO.status);
        }
    }


    public static class ApplicantInformationDOWithEmailWithIndex {
        public Long application_number;
        public String applicant_first_name;
        public String applicant_last_name;
        public String coapplicant_first_name;
        public String coapplicant_last_name;
        public String street;
        public String city;
        public String state;
        public Long zipcode;
        public String phone_number;
        public String application_date;
        public int status;
        public String email;

        public ApplicantInformationDOWithEmailWithIndex(ApplicantInformationDOWithEmail applicantInformationDO) {
            this.application_number = applicantInformationDO.application_number;
            this.applicant_first_name = applicantInformationDO.applicant_first_name;
            this.applicant_last_name = applicantInformationDO.applicant_last_name;
            this.coapplicant_last_name = applicantInformationDO.coapplicant_last_name;
            this.coapplicant_first_name = applicantInformationDO.coapplicant_first_name;
            this.street = applicantInformationDO.street;
            this.state = applicantInformationDO.state;
            this.city = applicantInformationDO.city;
            this.zipcode = applicantInformationDO.zipcode;
            this.phone_number = applicantInformationDO.phone_number;
            this.application_date = applicantInformationDO.application_date;
            this.email = applicantInformationDO.email;
            this.status = statusConvert(applicantInformationDO.status);
        }
    }

    @Autowired
    private ApplicantInformationMapper applicantInformationMapper;
    @Autowired
    private AdoptionInformationMapper adoptionInformationMapper;

    @RequestMapping(value = "/applicantInformation", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public List<ApplicantInformationDOWithIndex> selectAll(){

        return applicantInformationMapper.selectAll().stream().map(e->new ApplicantInformationDOWithIndex(e)).collect(Collectors.toList());
    }

    @RequestMapping(value = "/applicantInformationWithEmail", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public List<ApplicantInformationDOWithEmailWithIndex> selectAllWithEmail(){
        return applicantInformationMapper.selectAllWithEmail().stream().map(e->new ApplicantInformationDOWithEmailWithIndex(e)).collect(Collectors.toList());
    }

    @RequestMapping(value = "/applicantInformation", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    public boolean insertApplicantInformation(@RequestBody ApplicantInformationDOWithIndex applicantInformationDO) {
        return applicantInformationMapper.insertApplicantInformation(
            applicantInformationDO.applicant_first_name,
            applicantInformationDO.applicant_last_name,
            applicantInformationDO.coapplicant_first_name,
            applicantInformationDO.coapplicant_last_name,
            applicantInformationDO.street,
            applicantInformationDO.city,
            applicantInformationDO.state,
            applicantInformationDO.zipcode,
            applicantInformationDO.phone_number,
            YyyyMMddToSqlTimeStamp.getTimeFromString(applicantInformationDO.application_date),
            statusConvertBack(applicantInformationDO.status));
    }

    @RequestMapping(value = "/applicantInformationWithEmail", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    public boolean insertApplicantInformationWithEmail(@RequestBody ApplicantInformationDOWithEmailWithIndex applicantInformationDO) {
        adoptionInformationMapper.addAdopterEmailInfo(applicantInformationDO.email, applicantInformationDO.application_number);
        return applicantInformationMapper.insertApplicantInformation(
            applicantInformationDO.applicant_first_name,
            applicantInformationDO.applicant_last_name,
            applicantInformationDO.coapplicant_first_name,
            applicantInformationDO.coapplicant_last_name,
            applicantInformationDO.street,
            applicantInformationDO.city,
            applicantInformationDO.state,
            applicantInformationDO.zipcode,
            applicantInformationDO.phone_number,
            YyyyMMddToSqlTimeStamp.getTimeFromString(applicantInformationDO.application_date),
            statusConvertBack(applicantInformationDO.status));
    }

    @RequestMapping(value = "/applicantInformation/{application_number}", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public ApplicantInformationDOWithIndex selectByApplicationNumber(@PathVariable("application_number") Long application_number){
        return new ApplicantInformationDOWithIndex (applicantInformationMapper.selectByApplicationNumber(application_number));
    }

    @RequestMapping(value = "/applicantInformationWithEmail/{application_number}", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")

    @ResponseBody
    public ApplicantInformationDOWithEmailWithIndex selectByApplicationNumberWithEmail(@PathVariable("application_number") Long application_number){
        return new ApplicantInformationDOWithEmailWithIndex (applicantInformationMapper.selectByApplicationNumberWithEmail(application_number));
    }

}
