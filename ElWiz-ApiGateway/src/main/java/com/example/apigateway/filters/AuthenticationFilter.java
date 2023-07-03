package com.example.apigateway.filters;

import com.example.apigateway.config.RouteValidator;
import com.example.apigateway.services.JwtService;
import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {
    public AuthenticationFilter(){
        super(Config.class);
    }

    @Autowired
    private RouteValidator validator;

    @Autowired
    private JwtService jwtService;

    @Override
    public GatewayFilter apply(Config config) {
        return (((exchange, chain) -> {
            if(validator.isSecured.test(exchange.getRequest())){
                //header contains token or not
                if(!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)){
                    throw new RuntimeException("Missing auth header");
                }
                String authHeader = exchange.getRequest().getHeaders().get(org.springframework.http.HttpHeaders.AUTHORIZATION).get(0);
                if(authHeader != null && authHeader.startsWith("Bearer ")){
                    authHeader = authHeader.substring(7);
                }
                try{
                    jwtService.validateToken(authHeader);
                }catch(Exception e){
                    throw new RuntimeException("Token invalid");
                }
                String rollNumber = jwtService.extractUsername(authHeader);
                exchange
                        .getRequest()
                        .mutate()
                        .header("x-RollNumber", rollNumber)
                        .build();
            }
            return chain.filter(exchange);
        }));
    }

    public static class Config{
    }
}
