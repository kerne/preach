package cl.buin.preach.services;

import java.util.List;
import java.util.Map;

import cl.buin.preach.model.Hermanos;

public interface HermanosService {

	public Hermanos create(Hermanos hermanos);

	public List<Hermanos> findAll();

	public Map<Object, Object> findId(String id);

	public void update(Long id);
	
	public void remove(String id);
}
