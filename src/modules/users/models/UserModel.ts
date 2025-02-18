import { Schema, model, Document } from "mongoose";
import GeoService from "../../../core/services/GeoService";

export interface IUser extends Document {
  name: string;
  email: string;
  address: string;
  coordinates: [number, number];
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    coordinates: { type: [Number], required: true },
  },
  { timestamps: true }
);

UserSchema.pre<IUser>("save", async function (next) {
  console.log("[UserModel] Hook pre-save chamado.");

  try {
    if (this.isModified("coordinates")) {
      console.log(
        "[UserModel] coordinates foi modificado. Buscando endereço..."
      );
      this.address = await GeoService.getAddressFromCoordinates(
        this.coordinates
      );
      console.log("[UserModel] Endereço atualizado:", this.address);
    } else if (this.isModified("address")) {
      console.log(
        "[UserModel] address foi modificado. Buscando coordenadas..."
      );
      const { lat, lng } = await GeoService.getCoordinatesFromAddress(
        this.address
      );
      this.coordinates = [lng, lat];
      console.log("[UserModel] Coordenadas atualizadas:", this.coordinates);
    }
  } catch (error) {
    console.warn(
      "[UserModel] Erro ao buscar dados de localização:",
      error
    );
  }

  next();
});

const UserModel = model<IUser>("User", UserSchema);
export default UserModel;
