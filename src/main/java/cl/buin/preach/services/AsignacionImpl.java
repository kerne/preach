package cl.buin.preach.services;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

import org.hibernate.engine.jdbc.BlobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import cl.buin.preach.bean.Asignacion;
import cl.buin.preach.bean.RequestAsignacion;
import cl.buin.preach.bean.ResponseAsignacion;
import cl.buin.preach.model.Asignaciones;
import cl.buin.preach.repository.AsignacionRepository;
import cl.buin.preach.repository.TurnosRepository;
import cl.buin.preach.util.Util;

@Service
public class AsignacionImpl implements AsignacionService {

	@Autowired
	AsignacionRepository asignacionRepo;

	@Autowired
	TurnosRepository turnosRepo;

	@Override
	public ResponseAsignacion create(RequestAsignacion asignacion) {

		Asignaciones asignaciones = new Asignaciones();

		try {
			byte[] json = Util.toJson(asignacion.getAsignaciones());
			Blob datos = BlobProxy.generateProxy(json);
			asignaciones.setAsignacion(datos);
			asignaciones.setMes(asignacion.getMes());

			ObjectMapper objectMapper = new ObjectMapper();

			Asignaciones response = asignacionRepo.save(asignaciones);

			String data = Util.blobToString(response.getAsignacion());

			ResponseAsignacion responseAsignacion = new ResponseAsignacion();
			responseAsignacion.setIdAsignacion(response.getIdasignacion());
			responseAsignacion.setAsignaciones(objectMapper.readValue(data, new TypeReference<List<Asignacion>>() {
			}));
			responseAsignacion.setMes(asignacion.getMes());
			return responseAsignacion;
		} catch (SQLException | IOException e) {
			e.printStackTrace();
		}
		return null;

	}

	@Override
	public ResponseAsignacion findAll(Integer id) {
		ResponseAsignacion asignacion = new ResponseAsignacion();
		ObjectMapper objectMapper = new ObjectMapper();
		for (Asignaciones asig : asignacionRepo.findAll(id)) {
			try {
				String data = Util.blobToString(asig.getAsignacion());
				List<Asignacion> list = objectMapper.readValue(data, new TypeReference<List<Asignacion>>() {
				});
				asignacion.getAsignaciones().addAll(list);
				asignacion.setMes(asig.getMes());
				asignacion.setIdAsignacion(asig.getIdasignacion());

			} catch (SQLException | IOException e) {
				e.printStackTrace();
			}
		}

		return asignacion;
	}

	@Override
	public ResponseAsignacion update(RequestAsignacion asignacion) {
		Asignaciones asignaciones = new Asignaciones();

		try {
			byte[] json = Util.toJson(asignacion.getAsignaciones());
			Blob datos = BlobProxy.generateProxy(json);
			asignaciones.setAsignacion(datos);
			asignaciones.setMes(asignacion.getMes());
			asignaciones.setIdasignacion(asignacion.getIdAsignacion());

			ObjectMapper objectMapper = new ObjectMapper();

			Asignaciones response = asignacionRepo.save(asignaciones);

			String data = Util.blobToString(response.getAsignacion());

			ResponseAsignacion responseAsignacion = new ResponseAsignacion();
			responseAsignacion.setAsignaciones(objectMapper.readValue(data, new TypeReference<List<Asignacion>>() {
			}));
			responseAsignacion.setMes(asignacion.getMes());
			responseAsignacion.setIdAsignacion(response.getIdasignacion());
			return responseAsignacion;
		} catch (SQLException | IOException e) {
			e.printStackTrace();
		}
		return null;
	}

}
