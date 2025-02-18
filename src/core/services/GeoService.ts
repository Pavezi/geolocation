import axios from "axios";
import config from "../../config"
class GeoLib {

  async getAddressFromCoordinates(
    coordinates: [number, number] | { lat: number; lng: number }
  ): Promise<string> {
    const { lat, lng } = Array.isArray(coordinates)
      ? { lat: coordinates[0], lng: coordinates[1] }
      : coordinates;

    try {
      const response = await axios.get(`${config.nominatimUrl}/reverse`, {
        params: { format: "json", lat, lon: lng },
      });

      if (response.data.display_name) {
        return response.data.display_name;
      }
      throw new Error("Endereço não encontrado");
    } catch (error) {
      throw new Error(`Erro ao buscar endereço: ${error}`);
    }
  }

  async getCoordinatesFromAddress(
    address: string
  ): Promise<{ lat: number; lng: number }> {
    try {
      const response = await axios.get(`${config.nominatimUrl}/search`, {
        params: { format: "json", q: address },
      });

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
      }
      throw new Error("Coordenadas não encontradas");
    } catch (error) {
      throw new Error(`Erro ao buscar coordenadas: ${error}`);
    }
  }
}

export default new GeoLib();
