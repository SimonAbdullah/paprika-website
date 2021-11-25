import { useQuery, UseQueryOptions } from "react-query";
import { PagedResultDto } from "../../../utils/base-api/api-provider";
import {
  InitialUpcomingEventNumber,
  NumberOfUpcomingEventToShow,
} from "../constants/customer-event.constants";
import { customerEventServices } from "../services/customer-event/customer-event.services";
import { CustomerEventDto } from "../services/customer-event/models/customer-event-dto.models";
import { CustomerEventParams } from "../services/customer-event/models/customer-event-params.models";

export const useUpcomingEvents = (
  params?: CustomerEventParams,
  options?: UseQueryOptions<
    PagedResultDto<CustomerEventDto>,
    unknown,
    PagedResultDto<CustomerEventDto>
  >
) => {
  const result = useQuery(
    "upcomingEvent",
    async () => {
      const result = await customerEventServices.getAllUpcomingEvent({
        SkipCount: InitialUpcomingEventNumber,
        MaxResultCount: NumberOfUpcomingEventToShow,
        ...params,
      });

      return result.result;
    },
    options
  );

  return result;
};
