package cl.buin.preach.model;

import java.io.Serializable;

public class Hermanos implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String idHermano;

	private String nombre;

	private String apellido;

	private String sexo;

	public String getIdHermano() {
		return idHermano;
	}

	public void setIdHermano(String idHermano) {
		this.idHermano = idHermano;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

}
