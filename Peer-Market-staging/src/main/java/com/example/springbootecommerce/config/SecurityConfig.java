package com.example.springbootecommerce.config;

import com.example.springbootecommerce.security.CustomUserDetailService;
import com.example.springbootecommerce.security.JWTAuthenticationFilter;
import com.example.springbootecommerce.security.JwtAuthEntryPoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true,securedEnabled = true,jsr250Enabled = true)
public class SecurityConfig {
    private final CustomUserDetailService customUserDetailService;
    private final JwtAuthEntryPoint jwtAuthEntryPoint;
    public SecurityConfig(CustomUserDetailService customUserDetailService, JwtAuthEntryPoint jwtAuthEntryPoint) {
        this.customUserDetailService = customUserDetailService;
        this.jwtAuthEntryPoint = jwtAuthEntryPoint;
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
                .csrf().disable()
                .cors()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthEntryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers("/auth/login").permitAll()
                                .requestMatchers("/auth/*").permitAll()
                                .requestMatchers("/users/*").permitAll()
                                .requestMatchers("/address/*").permitAll()
                                .requestMatchers("/address").permitAll()
                                .requestMatchers("/comment/*").permitAll()
                                .requestMatchers("/comment").permitAll()
                                .requestMatchers("/orders/*").permitAll()
                                .requestMatchers("/orders").permitAll()
                                .requestMatchers("/payment/*").permitAll()
                                .requestMatchers("/payment").permitAll()
                                .requestMatchers("/payment/vnpay/success").permitAll()
                                .requestMatchers("/shop/*").permitAll()
                                .requestMatchers("/shop").permitAll()
                                .requestMatchers("/product_detail/*").permitAll()
                                .requestMatchers("/product_detail").permitAll()
                                .requestMatchers("/product/*").permitAll()
                                .requestMatchers("/product").permitAll()
                                .requestMatchers("/transports/*").permitAll()
                                .requestMatchers("/transports").permitAll()
                                .requestMatchers("/detail/*").permitAll()
                                .requestMatchers("/detail").permitAll()
                                .requestMatchers("/transport/*").permitAll()
                                .requestMatchers("/transport").permitAll()
                                .requestMatchers("/carts/*").permitAll()
                                .requestMatchers("/carts").permitAll()
                                .requestMatchers("/users").permitAll()
                                .requestMatchers("/role").permitAll()
                                .requestMatchers("/role/save").permitAll()
                                .requestMatchers("/users/export/csv").permitAll()
                                .requestMatchers("/users/export/excel").permitAll()
                                .requestMatchers("/users/export/pdf").permitAll()
                                .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
        AuthenticationConfiguration authenticationConfiguration
    ) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public JWTAuthenticationFilter jwtAuthenticationFilter(){
        return new JWTAuthenticationFilter()      ;
    }

    @Bean
    UrlBasedCorsConfigurationSource configuration(){
        CorsConfiguration configuration = new CorsConfiguration() ;
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;
    }


}

