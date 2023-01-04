import { useState } from "react";
import Header from "@/atoms/navigators/Header";
import AdminQuery from "@/organisms/admin-queryer";

import "@/styles/Home.css";

import { getJamaatMemberByITSId, getHouseholdById } from "@/api/thaaliApi";

export default function Query() {

  // getJamaatMemberByITSId
  const [getJamaatMemberByITSId_input, set_getJamaatMemberByITSId_input] = useState(0);
  const [getJamaatMemberByITSId_output, set_getJamaatMemberByITSId_output] = useState({});
  const change_getJamaatMemberByITSId_input = (e) => set_getJamaatMemberByITSId_input(e.target.value);
  const change_getJamaatMemberByITSId_output = (e) => set_getJamaatMemberByITSId_output(e.target.value);

  const thisgetJamaatMemberByITSId = async () => {
    getJamaatMemberByITSId(getJamaatMemberByITSId_input).then((d) => {
      set_getJamaatMemberByITSId_output(JSON.stringify(d, null, 4));
    });
  };

  return (
    <div className="App">
      <Header />
      <h1>FMB DB Query Page</h1>
      <AdminQuery queryName="getJamaatMemberByITSId" req={getJamaatMemberByITSId} />
      <AdminQuery queryName="getHouseholdById" req={getHouseholdById} />
    </div>
  );
}
