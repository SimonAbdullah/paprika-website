import { IBaseApiResponse } from "../../../../utils/base-api/api-provider";
import ApiService from "../../../../utils/base-api/api-service";
import { PostLinksDto } from "./models/post-links-dto";
import { PostLinksParams } from "./models/post-links-params.models";

class PostLinksServices extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Links` });
  }
  public getForPost(
    params: PostLinksParams
  ): Promise<IBaseApiResponse<PostLinksDto>> {
    return this.get("/GetForPost", { params: params });
  }
}
export const postLinksServices = new PostLinksServices();
