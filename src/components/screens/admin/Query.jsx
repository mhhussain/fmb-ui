import { useState } from "react";
import Header from "@/atoms/navigators/Header";
import AdminQuery from "@/organisms/admin-queryer";

import "@/styles/Home.css";

import {
  getJamaatMemberByITSId,
  getHouseholdById,
  getFMBProfileByHouseholdId
} from "@/api/thaaliApi";

export default function Query() {
  return (
    <div className="App">
      <Header />
      <h1>FMB DB Query Page</h1>
      <AdminQuery queryName="getJamaatMemberByITSId" req={getJamaatMemberByITSId} />
      <AdminQuery queryName="getHouseholdById" req={getHouseholdById} />
      <AdminQuery queryName="getFMBProfileByHouseholdId" req={getFMBProfileByHouseholdId} />
    </div>
  );
}
