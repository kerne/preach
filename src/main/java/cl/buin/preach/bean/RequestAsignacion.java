package cl.buin.preach.bean;

import java.util.List;

import lombok.Data;

@Data
public class RequestAsignacion {

	private List<Asignacion> asignaciones;

	private Long idAsignacion;

	private Integer mes;

}
