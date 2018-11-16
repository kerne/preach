package cl.buin.preach.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.buin.preach.model.Articulos;
import cl.buin.preach.services.ArticulosService;

@RestController
@RequestMapping("/articulos")
public class ArticulosController {

	@Autowired
	ArticulosService service;

	@PostMapping("/create")
	public void create(@RequestBody Articulos articulos) {
		service.create(articulos);
	}

	@GetMapping("/find-id/{id}")
	public ResponseEntity<Articulos> findId(@PathVariable("id") Long id) {
		return new ResponseEntity<>(service.findId(id), HttpStatus.OK);
	}

	@GetMapping("/find-all")
	public ResponseEntity<List<Articulos>> findAll() {
		return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
	}

	@DeleteMapping("/remove/{id}")
	public void remove(@PathVariable(name = "id") Long id) {
		service.remove(id);
	}
}
