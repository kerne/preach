package cl.buin.preach.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.UnsupportedEncodingException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.UUID;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import cl.buin.preach.model.Hermano;
import cl.buin.preach.model.Hermanos;

public class Util {

	public static byte[] toByte(Object object) throws IOException {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();

		ObjectOutputStream oos = new ObjectOutputStream(baos);
		oos.writeObject(object);
		return baos.toByteArray();
	}

	public static byte[] toJson(Object object) throws JsonProcessingException, UnsupportedEncodingException {
		return new ObjectMapper().writeValueAsString(object).getBytes("UTF-8");
	}

	public static String blobToString(Blob blob) throws SQLException {
		return new String(blob.getBytes(1, (int) blob.length()));
	}

	public static String getUIID() {
		String uuid = UUID.randomUUID().toString();
		return uuid;
	}

	public static void main(String[] args) throws IOException {
		Hermanos hermanos = new Hermanos();
		hermanos.setNombre("nombre");
		hermanos.setApellido("nombre");
		hermanos.setSexo("nombre");
		System.out.println(getUIID());
		String json = new ObjectMapper().writeValueAsString(hermanos);
		System.out.println(json);

		Hermano hermano = new Hermano();
		ByteArrayInputStream bais = new ByteArrayInputStream(toByte(json));

	}
}
