package cl.buin.preach.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cl.buin.preach.model.Articulos;

@Repository
public interface ArticulosRepository extends JpaRepository<Articulos, Long> {

}
