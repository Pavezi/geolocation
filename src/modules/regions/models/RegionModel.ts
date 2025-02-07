import {
  prop,
  Ref,
  pre,
  getModelForClass,
  modelOptions,
} from "@typegoose/typegoose";
import { User, UserModel } from "../../users/models/UserModel";
import mongoose from "mongoose";

@pre<Region>("save", async function (next) {
  if (!this._id) {
    this._id = new mongoose.Types.ObjectId();
  }

  if (this.isNew) {
    const user = await UserModel.findById(this.user);
    if (user) {
      user.regions.push(this._id);
      await user.save();
    }
  }

  next();
})
@modelOptions({ schemaOptions: { timestamps: true } })
export class Region {
  @prop({ required: true })
  name!: string;

  @prop({ ref: () => User, required: true })
  user!: Ref<User>;
}

export const RegionModel = getModelForClass(Region);
