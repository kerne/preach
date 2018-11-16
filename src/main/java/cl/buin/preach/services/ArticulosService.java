package cl.buin.preach.services;

import java.util.List;

import cl.buin.preach.model.Articulos;

public interface ArticulosService {

	public String create(Articulos articulos);

	public List<Articulos> findAll();

	public Articulos findId(Long id);

	public void remove(Long id);
}
