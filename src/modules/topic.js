import mongoose, { Schema } from "mongoose"

const topicSchema = new Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
)

const Topic = mongoose.models.Topi || mongoose.model("Topic", topicSchema)

export default Topic
