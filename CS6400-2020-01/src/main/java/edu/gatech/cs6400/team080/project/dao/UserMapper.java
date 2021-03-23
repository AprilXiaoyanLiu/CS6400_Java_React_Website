package edu.gatech.cs6400.team080.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.*;

import edu.gatech.cs6400.team080.project.domain.UserDO;
@Mapper
public interface UserMapper {

    @Select("select * from LoginUser")
    List<UserDO> selectAll();
    @Select("select * from LoginUser where username=#{username}")
    public UserDO selectById(@Param("username") String username);

    @Select("select username from LoginUser where username=#{username} and password=#{password}")
    public String login(@Param("username") String username,@Param("password") String password);

    @Insert("INSERT INTO LoginUser (username, first_name, last_name, email_address, password, start_date, usertype) VALUES (#{username}, #{first_name}, #{last_name}, #{email_address}, #{password}, #{start_date}, #{usertype});")
    public boolean insertUser(
        @Param("username") String username, 
        @Param("first_name") String first_name, 
        @Param("last_name") String last_name, 
        @Param("email_address") String email_address, 
        @Param("password") String password, 
        @Param("start_date") String start_date, 
        @Param("usertype") String usertype
    ) ;

    @Update("UPDATE LoginUser SET first_name = #{first_name}, last_name=#{last_name}, email_address=#{email_address}, password=#{password}, start_date=#{start_date}, usertype=#{usertype} WHERE username=#{username};")
    public boolean updateUser(
        @Param("username") String username, 
        @Param("first_name") String first_name, 
        @Param("last_name") String last_name, 
        @Param("email_address") String email_address, 
        @Param("password") String password, 
        @Param("start_date") String start_date, 
        @Param("usertype") String usertype
    ) ;

    @Delete("DELETE from LoginUser WHERE username=#{username};")
    public boolean deleteUser(@Param("username") String username);
}