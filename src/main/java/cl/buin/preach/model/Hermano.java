package cl.buin.preach.model;

import java.io.Serializable;
import java.sql.Blob;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "hermano")
public class Hermano implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idhermano;

	private Blob datos;

	private String uuid;

	public Long getIdhermano() {
		return idhermano;
	}

	public void setIdhermano(Long idhermano) {
		this.idhermano = idhermano;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public Blob getDatos() {
		return datos;
	}

	public void setDatos(Blob datos) {
		this.datos = datos;
	}

}
