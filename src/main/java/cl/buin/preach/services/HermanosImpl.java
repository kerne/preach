package cl.buin.preach.services;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.hibernate.engine.jdbc.BlobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import cl.buin.preach.model.Hermano;
import cl.buin.preach.model.Hermanos;
import cl.buin.preach.repository.HermanosRepository;
import cl.buin.preach.util.Util;

@Service
public class HermanosImpl implements HermanosService {

	@Autowired
	HermanosRepository repo;

	@Override
	public Hermanos create(Hermanos hermanos) {

		try {
			Hermano hermano = new Hermano();
			String uuid = Util.getUIID();
			hermanos.setIdHermano(uuid);
			hermano.setUuid(uuid);
			byte[] json = Util.toJson(hermanos);
			Blob datos = BlobProxy.generateProxy(json);
			hermano.setDatos(datos);

			ObjectMapper objectMapper = new ObjectMapper();

			Hermano hermano2 = repo.save(hermano);
			String data = Util.blobToString(hermano2.getDatos());

			return objectMapper.readValue(data, new TypeReference<Hermanos>() {
			});
		} catch (IOException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;

	}

	@Override
	public List<Hermanos> findAll() {

		return repo.findAll().stream().map(hermano -> getHermano(hermano)).collect(Collectors.toList());

	}

	public Hermanos getHermano(Hermano hermano) {
		ObjectMapper objectMapper = new ObjectMapper();
		String data;
		try {
			data = Util.blobToString(hermano.getDatos());
			return objectMapper.readValue(data, new TypeReference<Hermanos>() {
			});
		} catch (SQLException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;

	}

	@Override
	public void remove(String id) {
		repo.deleteHermano(id);
	}

	@Override
	public Map<Object, Object> findId(String id) {
		Hermano hermano = repo.getHermano(id);
		Map<Object, Object> map = new HashMap<Object, Object>();
		map.put("id", hermano.getIdhermano());
		try {
			String datos = Util.blobToString(hermano.getDatos());
			ObjectMapper objectMapper = new ObjectMapper();

			map.put("datos", objectMapper.readValue(datos, new TypeReference<Hermanos>() {
			}));
		} catch (SQLException | IOException e) {
			e.printStackTrace();
		}
		return map;
	}

	@Override
	public void update(Long id) {

	}
}
