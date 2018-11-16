package cl.buin.preach.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.buin.preach.bean.RequestAsignacion;
import cl.buin.preach.bean.ResponseAsignacion;
import cl.buin.preach.services.AsignacionService;

@RestController
@RequestMapping("/asignacion")
public class AsignacionController {

	@Autowired
	AsignacionService service;

	@PostMapping("/create")
	public ResponseEntity<ResponseAsignacion> create(@RequestBody RequestAsignacion asignaciones) {
		return new ResponseEntity<ResponseAsignacion>(service.create(asignaciones), HttpStatus.OK);
	}
	
	@PutMapping("/update")
	public ResponseEntity<ResponseAsignacion> actualizar(@RequestBody RequestAsignacion asignaciones) {
		return new ResponseEntity<ResponseAsignacion>(service.update(asignaciones), HttpStatus.OK);
	}

	@GetMapping("/find-all/{id}")
	public ResponseEntity<ResponseAsignacion> findAll(@PathVariable Integer id) {
		return new ResponseEntity<ResponseAsignacion>(service.findAll(id), HttpStatus.OK);
	}
}
