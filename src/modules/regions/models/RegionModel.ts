import {
  prop,
  pre,
  getModelForClass,
  modelOptions,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";

@pre<Region>("save", async function (next) {
  if (!this._id) {
    this._id = new mongoose.Types.ObjectId();
  }

  if (this.isNew) {
    const UserModel = mongoose.model("User");
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

  @prop({ ref: "User", required: true, type: mongoose.Schema.Types.ObjectId })
  user!: Ref<mongoose.Schema.Types.ObjectId>;
}

export const RegionModel = getModelForClass(Region);
