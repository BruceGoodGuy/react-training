import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createAuthenticated } from "../store/authenticated";

export const useStore = create<StoreState>()(
  persist(
    immer((...a) => ({
      ...createAuthenticated(...a),
    })),
    {
      name: "kyc-data",
    }
  )
);
