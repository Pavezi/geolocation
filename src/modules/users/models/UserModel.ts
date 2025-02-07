import {
  prop,
  Ref,
  pre,
  getModelForClass,
  modelOptions,
} from "@typegoose/typegoose";
import { Region } from "../../regions/models/RegionModel";
import GeoService from "../../../core/services/GeoService";

@pre<User>("save", async function (next) {
  if (this.isModified("coordinates")) {
    this.address = await GeoService.getAddressFromCoordinates(this.coordinates);
  } else if (this.isModified("address")) {
    const { lat, lng } = await GeoService.getCoordinatesFromAddress(
      this.address
    );
    this.coordinates = [lng, lat];
  }
  next();
})
@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop({ required: true })
  name!: string;

  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true })
  address!: string;

  @prop({ required: true, type: () => [Number] })
  coordinates!: [number, number];

  @prop({ ref: () => Region, default: [] })
  regions!: Ref<Region>[];
}

export const UserModel = getModelForClass(User);
