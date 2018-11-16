package cl.buin.preach.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import cl.buin.preach.model.Hermano;

@Repository
public interface HermanosRepository extends JpaRepository<Hermano, Long> {

	@Query(value = "SELECT h FROM Hermano h where h.uuid= ?1")
	public Hermano getHermano(String id);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM Hermano h where h.uuid= ?1")
	public void deleteHermano(String id);
}
