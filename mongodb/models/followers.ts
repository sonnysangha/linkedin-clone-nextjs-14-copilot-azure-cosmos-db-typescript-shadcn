import mongoose, { Schema, Document, Model, models } from "mongoose";

export interface IFollowersBase {
  follower: string;
  following: string;
}

// Define the document methods (for each instance of a follower relationship)
interface IFollowersMethods {
  unfollow(): Promise<void>;
}

// Define the document interface
export interface IFollowers
  extends IFollowersBase,
    Document,
    IFollowersMethods {
  createdAt: Date;
  updatedAt: Date;
}

// Define the static methods
interface IFollowersStatics {
  follow(follower: string, following: string): Promise<IFollowers>;
  getAllFollowers(userId: string): Promise<IFollowers[]>;
  getAllFollowing(userId: string): Promise<IFollowers[]>;
}

// Merge the document methods, and static methods with IFollowers
interface IFollowersModel extends Model<IFollowers>, IFollowersStatics {}

const FollowersSchema = new Schema<IFollowers>(
  {
    follower: { type: String, required: true },
    following: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

FollowersSchema.methods.unfollow = async function () {
  try {
    await this.deleteOne({ _id: this._id });
  } catch (error) {
    console.log("error when unfollowing", error);
  }
};

FollowersSchema.statics.follow = async function (
  follower: string,
  following: string
) {
  try {
    const existingFollow = await this.findOne({ follower, following });

    if (existingFollow) {
      throw new Error("You are already following this user");
    }

    const follow = await this.create({ follower, following });
    return follow;
  } catch (error) {
    console.log("error when following", error);
  }
};

FollowersSchema.statics.getAllFollowers = async function (userId: string) {
  try {
    const followers = await this.find({ following: userId });
    return followers;
  } catch (error) {
    console.log("error when getting all followers", error);
  }
};

FollowersSchema.statics.getAllFollowing = async function (userId: string) {
  try {
    const following = await this.find({ follower: userId });
    return following;
  } catch (error) {
    console.log("error when getting all following", error);
  }
};

export const Followers =
  (models.Followers as IFollowersModel) ||
  mongoose.model<IFollowers, IFollowersModel>("Followers", FollowersSchema);
