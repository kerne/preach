package cl.buin.preach;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"cl.buin.preach.controller","cl.buin.preach.repository","cl.buin.preach.services"})
public class PreachApplication {

	public static void main(String[] args) {
		SpringApplication.run(PreachApplication.class, args);
	}
}
