package cl.buin.preach.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import cl.buin.preach.model.Asignaciones;

public interface AsignacionRepository extends JpaRepository<Asignaciones, Long> {

	@Query("select a from Asignaciones a where a.mes= ?1")
	public List<Asignaciones> findAll(Integer id);

}
