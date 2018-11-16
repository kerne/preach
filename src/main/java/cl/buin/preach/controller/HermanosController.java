package cl.buin.preach.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import cl.buin.preach.model.Hermanos;
import cl.buin.preach.services.HermanosService;

@RestController
@RequestMapping("/hermanos")
public class HermanosController {

	@Autowired
	HermanosService service;

	@PostMapping("/create")
	public @ResponseBody Hermanos create(@RequestBody Hermanos hermano) {
		return service.create(hermano);
	}

	@PostMapping("/update/{id}")
	public void update(@RequestBody Long id) {
		service.update(id);
	}

	@GetMapping("/find-id/{id}")
	public ResponseEntity<Map<Object, Object>> findId(@PathVariable("id") String id) {
		return new ResponseEntity<>(service.findId(id), HttpStatus.OK);
	}

	@GetMapping("/find-all")
	public ResponseEntity<List<Hermanos>> findAll() {
		return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
	}

	@DeleteMapping("/remove/{id}")
	public void remove(@PathVariable(name = "id") String id) {
		service.remove(id);
	}
}
