package com.example.namingserver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

import com.example.namingserver.Cloud.Monitor;

@EnableEurekaServer
@SpringBootApplication
public class NamingServerApplication {

	@Autowired
	private static Monitor monitor = new Monitor();
	public static void main(String[] args) {
		monitor.putAlarm("ApiCalls", "count", "Elwiz/LOGS", "ApiCalls", "Sum", 100.0);
		SpringApplication.run(NamingServerApplication.class, args);
	}
}
