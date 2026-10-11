import axios from "axios";
import type { StockShortage } from "../types";

export class apiError extends Error {
  readonly status: number;
  readonly shortages: StockShortage[];

  constructor(message: string, status: number, shortages: StockShortage[] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.shortages = shortages;
  }

  get isInsufficientStock(): boolean {
    return this.status === 409;
  }
}

interface ProblemDetails {
  title?: string;
  detail?: string;
  shortages?: StockShortage[];
}

export function toApiError(error: unknown): apiError {
  if (error instanceof apiError) return error;

  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return new apiError(
        "Couldn't connect with the server",
        0,
      );
    }

    const { status, data } = error.response;
    const problem = (data ?? {}) as ProblemDetails;

    if (status === 403) {
      return new apiError("You do not have permission with this feature", status);
    }
    if (status === 401 && !problem.detail) {
      return new apiError("Your session has expired. Please sign in again.", status);
    }

    return new apiError(
      problem.detail ?? problem.title ?? "Something went wrong. Please try again.",
      status,
      problem.shortages ?? [],
    );
  }

  return new apiError("Something went wrong. Please try again.", 0);
}