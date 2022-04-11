import { HistSearchResponse } from "./hist-search-response.models";
import { ShardsSearchResponse } from "./shards-search-response.models";

export interface BaseApiSearchResponse {
  timed_out: boolean;
  took: number;
  _shards: ShardsSearchResponse;
  hits: HistSearchResponse;
}
