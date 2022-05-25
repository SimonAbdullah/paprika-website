import { useQuery, UseQueryOptions } from "react-query";
import { customerDownloadLinkServices } from "../services/customer-download-link/customer-download-link.services";
import { CustomerDownloadLinkDto } from "../services/customer-download-link/models/customer-download-link-dto.models";

export const usePaprikaDownloadLink = (
    options?: UseQueryOptions<
      CustomerDownloadLinkDto,
      unknown,
      CustomerDownloadLinkDto
    >
  ) => {
    const result = useQuery(
      "paprikaDownloadLink",
      async () => {
        const result = await customerDownloadLinkServices.getCustomerDownloadLink();
        return result.result;
      },
      options
    );
  
    return result;
  };