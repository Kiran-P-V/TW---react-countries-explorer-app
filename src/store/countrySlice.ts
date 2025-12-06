import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { CountryCardProps } from "../components/CountryCard";

interface ApiCountry {
  name?: { common?: string } | string;
  region?: string;
  flags?: { png?: string; svg?: string };
  flag?: string;
}

export interface CountriesState {
  items: CountryCardProps[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CountriesState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const API_URL = "https://restcountries.com/v2/all?fields=name,region,flag";
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to load countries");
    }
    const data: ApiCountry[] = await response.json();

    const mapped: CountryCardProps[] = data
      .map((item) => ({
        name:
          typeof item.name === "string"
            ? item.name
            : (item.name?.common ?? "Unknown"),
        region: item.region ?? "Unknown",
        flag: item.flags?.png ?? item.flags?.svg ?? item.flag,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return mapped;
  },
);

const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch countries";
      });
  },
});

export default countrySlice.reducer;
