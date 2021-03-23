package edu.gatech.cs6400.team080.project.domain;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class YyyyMMddToSqlTimeStamp {
    public static Timestamp getTimeFromString(String time)  {
        Timestamp timestamp;
        try {
            timestamp = new Timestamp(new SimpleDateFormat("yyyy-MM-dd").parse(time).getTime());
        } catch (ParseException e) {
            throw new IllegalArgumentException(e);
        }
        return timestamp;
    }
}