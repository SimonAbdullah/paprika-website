import ApiService from "../../../utils/base-api/api-service";
import { RequestVerificationCodeForGuestDto } from "./models/request-verification-code-for-guest-dto.models";

class GuestServices extends ApiService {
  constructor() {
    super({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/Guest`,
    });
  }

  public requestAndResendVerificationCode(
    data: RequestVerificationCodeForGuestDto
  ): Promise<any> {
    return this.post("/RequestVerficationCode", data);
  }
}

export const guestServices = new GuestServices();
