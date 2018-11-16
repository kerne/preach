package cl.buin.preach.bean;

import java.util.ArrayList;
import java.util.List;

public class ResponseAsignacion {

	private List<Asignacion> asignaciones;

	private Long idAsignacion;

	private Integer mes;

	public List<Asignacion> getAsignaciones() {
		if (asignaciones == null) {
			asignaciones = new ArrayList<Asignacion>();
		}
		return asignaciones;
	}

	public void setAsignaciones(List<Asignacion> asignaciones) {
		this.asignaciones = asignaciones;
	}

	public Integer getMes() {
		return mes;
	}

	public void setMes(Integer mes) {
		this.mes = mes;
	}

	public Long getIdAsignacion() {
		return idAsignacion;
	}

	public void setIdAsignacion(Long idAsignacion) {
		this.idAsignacion = idAsignacion;
	}

}