package edu.gatech.cs6400.team080.project.domain;

public class VolunteerOfMonthDO {
    
    private String first_name;
    private String last_name;
    private String email_address;
    private Long total_hours;

    public String getFirst_name() {
        return this.first_name;
    }

    public String getLast_name() {
        return this.last_name;
    }

    public String getEmail_address() {
        return this.email_address;
    }

    public Long getTotal_hours() {
        return this.total_hours;
    }

}