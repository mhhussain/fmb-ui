import { getJamaatMemberByITSId } from "@/api/thaaliApi";

import { MumineenViewModel } from "@/api/models/viewmodels/MumineenViewModel";

const getMumineenByITSID = async (itsId) => {
    const dataObj = await getJamaatMemberByITSId(itsId);
    return new MumineenViewModel(dataObj);
};

export { getMumineenByITSID };