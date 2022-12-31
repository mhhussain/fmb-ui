import axios from "axios";

const getJamaatMemberByITSId = async (itsId) => {
  const res = await axios.get(
    `https://test-thaali-api.herokuapp.com/api/db/JamaatMembers?ItsID=${itsId}`
  );
  return res;
};

export { getJamaatMemberByITSId };
