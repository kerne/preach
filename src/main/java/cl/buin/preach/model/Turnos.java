package cl.buin.preach.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "turnos")
public class Turnos implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3267061043330702286L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idturnos")
	private Long idturnos;

	@Column(name = "idfecha")
	private Long idfecha;

	@Column(name = "fecha")
	private Date fecha;

	public Long getIdturnos() {
		return idturnos;
	}

	public void setIdturnos(Long idturnos) {
		this.idturnos = idturnos;
	}

	public Long getIdfecha() {
		return idfecha;
	}

	public void setIdfecha(Long idfecha) {
		this.idfecha = idfecha;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

}
