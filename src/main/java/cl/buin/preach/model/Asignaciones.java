package cl.buin.preach.model;

import java.io.Serializable;
import java.sql.Blob;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "asignaciones")
public class Asignaciones implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7366058492465940489L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idasignacion;

	private Blob asignacion;

	private Integer mes;

	public Long getIdasignacion() {
		return idasignacion;
	}

	public void setIdasignacion(Long idasignacion) {
		this.idasignacion = idasignacion;
	}

	public Blob getAsignacion() {
		return asignacion;
	}

	public void setAsignacion(Blob asignacion) {
		this.asignacion = asignacion;
	}

	public Integer getMes() {
		return mes;
	}

	public void setMes(Integer mes) {
		this.mes = mes;
	}

}
