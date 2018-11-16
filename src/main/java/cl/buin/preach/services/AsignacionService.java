package cl.buin.preach.services;

import cl.buin.preach.bean.RequestAsignacion;
import cl.buin.preach.bean.ResponseAsignacion;

public interface AsignacionService {

	public ResponseAsignacion create(RequestAsignacion asignacion);

	public ResponseAsignacion update(RequestAsignacion asignacion);

	public ResponseAsignacion findAll(Integer id);

}
