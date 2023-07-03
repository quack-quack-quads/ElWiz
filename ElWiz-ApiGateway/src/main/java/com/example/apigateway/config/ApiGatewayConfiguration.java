package com.example.apigateway.config;

import com.example.apigateway.filters.AuthenticationFilter;
import org.apache.hc.client5.http.auth.AuthStateCacheable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiGatewayConfiguration {
    @Autowired
    private AuthenticationFilter authenticationFilter;
    @Bean
    public RouteLocator gatewayRouter(RouteLocatorBuilder builder){
        GatewayFilter authFilter = authenticationFilter.apply(new AuthenticationFilter.Config());
        return builder.routes()
                .route(
                        p -> p.path("/data-provider/**")
                                .filters(spec -> spec.filter(authFilter))
                                .uri("lb://data-provider")
                )
                .route(
                        p -> p.path("/scores-service/**")
                                .filters(spec -> spec.filter(authFilter))
                                .uri("lb://scores-service")
                )
                .route(
                        p -> p.path("/authentication-service/**")
                                .uri("lb://authentication-service")
                )
                .build();
    }
}
