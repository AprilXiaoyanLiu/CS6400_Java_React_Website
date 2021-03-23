package edu.gatech.cs6400.team080.project;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.GsonHttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class ApplicationConfig extends WebMvcConfigurerAdapter {
    public static final Gson gson = new GsonBuilder()
                                            .setLenient()
                                            .create();

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(customGsonHttpMessageConverter());
        super.configureMessageConverters(converters);
    }

    private GsonHttpMessageConverter customGsonHttpMessageConverter() {
        Gson gson = new GsonBuilder()
            .setLenient()
            .create();

        GsonHttpMessageConverter gsonMessageConverter = new GsonHttpMessageConverter();
        gsonMessageConverter.setGson(gson);

        return gsonMessageConverter;
    }

}