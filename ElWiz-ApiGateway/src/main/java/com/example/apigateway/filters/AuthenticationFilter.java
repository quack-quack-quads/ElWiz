package com.example.apigateway.filters;

import com.example.apigateway.config.RouteValidator;
import com.example.apigateway.exceptions.CookieNotFoundException;
import com.example.apigateway.services.JwtService;
import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpCookie;
import org.springframework.stereotype.Component;

import java.util.List;

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
                String token = null;
                try{
                    List<HttpCookie> cookies = exchange.getRequest().getCookies().get("jwt");
                    for(HttpCookie cookie : cookies){
                        System.out.println(String.format("name : %s, value : %s", cookie.getName(), cookie.getValue()));
                    }
                    token = cookies.get(0).getValue();
                }catch(Exception e){
                    throw new CookieNotFoundException("Auth cookie not found");
                }

                try{
                    jwtService.validateToken(token);
                }catch(Exception e){
                    throw new RuntimeException("Token invalid");
                }
                String email = jwtService.extractUsername(token);
                exchange
                        .getRequest()
                        .mutate()
                        .header("x-Email", email)
                        .build();
            }
            return chain.filter(exchange);
        }));
    }

    public static class Config{
        
    }
}
