package edu.gatech.cs6400.team080.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import edu.gatech.cs6400.team080.project.domain.ApplicantInformationDO;
import edu.gatech.cs6400.team080.project.domain.ApplicantInformationDOWithEmail;


@Mapper
public interface ApplicantInformationMapper {


    @Select("select * from ApplicantInformation")
    public List<ApplicantInformationDO> selectAll();

    @Select("SELECT * FROM ApplicantInformation left join Adopter using (application_number);")
    public List<ApplicantInformationDOWithEmail> selectAllWithEmail();

    @Select("select * from ApplicantInformation where application_number=#{application_number}")
    public ApplicantInformationDO selectByApplicationNumber(@Param("application_number") Long application_number);

    @Select("SELECT * FROM ApplicantInformation left join Adopter on ApplicantInformation.application_number=Adopter.application_number where Adopter.application_number=#{application_number};")
    public ApplicantInformationDOWithEmail selectByApplicationNumberWithEmail(@Param("application_number") Long application_number);


    @Insert("INSERT INTO ApplicantInformation (applicant_first_name, applicant_last_name,coapplicant_first_name,coapplicant_last_name,street, city, state, zipcode, phone_number, application_date, status) VALUES (#{applicant_first_name},#{applicant_last_name},#{coapplicant_first_name},#{coapplicant_last_name},#{street},#{city},#{state},#{zipcode},#{phone_number},#{application_date},#{status})")
    public boolean insertApplicantInformation(
        @Param("applicant_first_name") String applicant_first_name, 
        @Param("applicant_last_name") String applicant_last_name, 
        @Param("coapplicant_first_name") String coapplicant_first_name, 
        @Param("coapplicant_last_name") String coapplicant_last_name,
        @Param("street") String street,
        @Param("city") String city,
        @Param("state") String state,
        @Param("zipcode") Long zipcode,
        @Param("phone_number") String phone_number,
        @Param("application_date") java.sql.Timestamp application_date,
        @Param("status") String status
        ) ;

}