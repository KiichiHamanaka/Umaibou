import { defineController } from "./$relay"
import { getYoutubeInfo } from "$/service/youtube"

export default defineController(() => ({
  get: () => ({
    status: 200,
    body: getYoutubeInfo()
  })
}))
