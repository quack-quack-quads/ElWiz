package com.example.apigateway.filters;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.example.apigateway.Cloud.Monitor;

import reactor.core.publisher.Mono;

@Component
public class LoggingFilter implements GlobalFilter, Ordered {

    private Logger logger = LoggerFactory.getLogger(LoggingFilter.class);

    @Autowired
    Monitor monitor;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        logger.info("Path of the request received -> {}", exchange.getRequest().getPath());
        System.out.println(exchange.getRequest().getPath().toString());
        String s = exchange.getRequest().getPath().toString();
         monitor.putMetric("ApiCalls", "count", "ApiCalls", "Elwiz/LOGS", 1.0);
        if (s.equals("/auth-service/v1/login")) {
            monitor.putMetric("logins", "count", "ApiCalls", "Elwiz/LOGS", 1.0);
        }
        if (s.contains("student")) {
            monitor.putMetric("studentApi", "count", "ApiCalls", "Elwiz/LOGS", 1.0);
        }
        else {
            monitor.putMetric("electiveApi", "count", "ApiCalls", "Elwiz/LOGS", 1.0);
        }
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
