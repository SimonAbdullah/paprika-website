import { IBaseApiResponse } from "../../../../utils/base-api/api-provider";
import ApiService from "../../../../utils/base-api/api-service";
import { EventLinksDto } from "./models/event-links-dto";
import { EventLinksParams } from "./models/event-links-params.models";

class EventLinksServices extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Links` });
  }
  public getForEvent(
    params: EventLinksParams
  ): Promise<IBaseApiResponse<EventLinksDto>> {
    return this.get("/GetForEvent", { params: params });
  }
}
export const eventLinksServices = new EventLinksServices();
