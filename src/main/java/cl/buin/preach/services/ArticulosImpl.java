package cl.buin.preach.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.buin.preach.model.Articulos;
import cl.buin.preach.repository.ArticulosRepository;

@Service
public class ArticulosImpl implements ArticulosService {

	@Autowired
	ArticulosRepository repo;

	@Override
	public String create(Articulos articulos) {
		repo.save(articulos);
		return "yes";
	}

	@Override
	public List<Articulos> findAll() {
		return repo.findAll();
	}

	@Override
	public void remove(Long id) {
		repo.deleteById(id);
	}

	@Override
	public Articulos findId(Long id) {
		Optional<Articulos> opo = repo.findById(id);
		return opo.get();
	}
}
